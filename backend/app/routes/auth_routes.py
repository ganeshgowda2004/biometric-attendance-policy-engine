from flask import Blueprint, request, jsonify
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from app import db
from app.models.user_model import User
from datetime import datetime

auth_bp = Blueprint("auth", __name__)

# ================= REGISTER =================
@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "Email already exists"}), 400

    if User.query.filter_by(employee_id=data["employee_id"]).first():
        return jsonify({"message": "Employee ID already exists"}), 400

    new_user = User(
        employee_id=data["employee_id"],
        name=data["name"],
        email=data["email"],
        dob=datetime.strptime(data["dob"], "%Y-%m-%d"),
        role=data.get("role", "employee")
    )

    new_user.set_password(data["password"])

    db.session.add(new_user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


# ================= LOGIN =================
@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    user = User.query.filter_by(employee_id=data["employee_id"]).first()

    if not user or not user.check_password(data["password"]):
        return jsonify({"message": "Invalid credentials"}), 401

    access_token = create_access_token(
        identity={
            "employee_id": user.employee_id,
            "role": user.role
        }
    )

    return jsonify({
        "access_token": access_token,
        "user": {
            "employee_id": user.employee_id,
            "name": user.name,
            "email": user.email,
            "role": user.role
        }
    }), 200



# ================= CURRENT USER =================
@auth_bp.route("/me", methods=["GET"])
@jwt_required()
def get_current_user():
    return jsonify(get_jwt_identity()), 200
