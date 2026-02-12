from app import db

class Leave(db.Model):
    __tablename__ = "leaves"

    id = db.Column(db.Integer, primary_key=True)

    # ✅ Use employee_id (not user_id)
    employee_id = db.Column(db.String(20), nullable=False)

    leave_type = db.Column(db.String(50), nullable=False)
    from_date = db.Column(db.Date, nullable=False)
    to_date = db.Column(db.Date, nullable=False)
    reason = db.Column(db.Text, nullable=False)
    status = db.Column(db.String(20), default="Pending")

    applied_on = db.Column(
        db.DateTime,
        server_default=db.func.now()
    )
