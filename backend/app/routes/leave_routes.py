from flask import Blueprint, jsonify

leave_bp = Blueprint('leave', __name__)

@leave_bp.route('/', methods=['GET'])
def get_leaves():
    return jsonify({"message": "Leave route working"})
