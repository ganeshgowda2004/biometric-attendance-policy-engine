from flask import Blueprint, request, jsonify
from app import db
from app.models.leave_model import Leave
from datetime import datetime

leave_bp = Blueprint("leave_bp", __name__)

@leave_bp.route("/apply-leave", methods=["POST"])
def apply_leave():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid JSON data"}), 400

    try:
        from_date = datetime.strptime(data["fromDate"], "%Y-%m-%d").date()
        to_date = datetime.strptime(data["toDate"], "%Y-%m-%d").date()
    except ValueError:
        return jsonify({"error": "Invalid date format"}), 400

    new_leave = Leave(
        user_id=data["userId"],
        leave_type=data["leaveType"],
        from_date=from_date,
        to_date=to_date,
        reason=data["reason"]
    )

    db.session.add(new_leave)
    db.session.commit()

    return jsonify({"message": "Leave applied successfully"})


@leave_bp.route("/my-leaves/<int:user_id>", methods=["GET"])
def get_my_leaves(user_id):
    leaves = Leave.query.filter_by(user_id=user_id).all()

    result = []
    for leave in leaves:
        result.append({
            "id": leave.id,
            "leaveType": leave.leave_type,
            "fromDate": str(leave.from_date),
            "toDate": str(leave.to_date),
            "reason": leave.reason,
            "status": leave.status
        })

    return jsonify(result)
