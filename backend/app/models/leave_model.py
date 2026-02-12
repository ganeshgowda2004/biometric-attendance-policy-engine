from app import db

class Leave(db.Model):
    __tablename__ = "leaves"

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"))
    leave_type = db.Column(db.String(50))
    from_date = db.Column(db.Date)
    to_date = db.Column(db.Date)
    reason = db.Column(db.Text)
    status = db.Column(db.String(20), default="Pending")
    applied_on = db.Column(db.DateTime, server_default=db.func.now())
