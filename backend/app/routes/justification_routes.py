from flask import Blueprint, jsonify

justification_bp = Blueprint('justification', __name__)

@justification_bp.route('/', methods=['GET'])
def get_justifications():
    return jsonify({"message": "Justification route working"})
