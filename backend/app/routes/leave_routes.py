from flask import Blueprint, request, jsonify
from app import db
from app.models.leave_model import Leave
from sqlalchemy import desc
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

    new_leave = Leave()
    new_leave.employee_id = data["employeeId"]
    new_leave.leave_type = data["leaveType"]
    new_leave.from_date = from_date
    new_leave.to_date = to_date
    new_leave.reason = data["reason"]

    db.session.add(new_leave)
    db.session.commit()

    return jsonify({"message": "Leave applied successfully"})


@leave_bp.route("/latest-leave/<string:employee_id>", methods=["GET"])
def get_latest_leave(employee_id):

    latest_leave = (
        Leave.query
        .filter_by(employee_id=employee_id)
        .order_by(desc(Leave.applied_on))
        .first()
    )

    if latest_leave is None:
        return jsonify({})

    return jsonify({
        "leaveType": latest_leave.leave_type,
        "fromDate": latest_leave.from_date.strftime("%Y-%m-%d"),
        "toDate": latest_leave.to_date.strftime("%Y-%m-%d"),
        "status": latest_leave.status
    })
