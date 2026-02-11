from flask import Blueprint, request, jsonify
from app import db
from app.models.user_model import User

auth_bp = Blueprint("auth", __name__)

@auth_bp.route("/register", methods=["POST"])
def register():
    data = request.get_json()

    # ✅ Check if JSON is received
    if not data:
        return jsonify({"message": "No input data provided"}), 400

    # ✅ Check required fields
    required_fields = ["name", "email", "password"]
    for field in required_fields:
        if field not in data:
            return jsonify({"message": f"{field} is required"}), 400

    # ✅ Check if user already exists
    if User.query.filter_by(email=data["email"]).first():
        return jsonify({"message": "User already exists"}), 400

    # ✅ Create user safely
    user = User(
        name=data["name"],
        email=data["email"],
        role=data.get("role", "user")
    )
    user.set_password(data["password"])

    db.session.add(user)
    db.session.commit()

    return jsonify({"message": "User registered successfully"}), 201


@auth_bp.route("/login", methods=["POST"])
def login():
    data = request.get_json()

    if not data:
        return jsonify({"message": "No input data provided"}), 400

    if "email" not in data or "password" not in data:
        return jsonify({"message": "Email and password required"}), 400

    user = User.query.filter_by(email=data["email"]).first()

    if user and user.check_password(data["password"]):
        return jsonify({
            "message": "Login successful",
            "user": {
                "id": user.id,
                "name": user.name,
                "role": user.role
            }
        }), 200

    return jsonify({"message": "Invalid email or password"}), 401
