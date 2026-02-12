from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

db = SQLAlchemy()

def create_app():
    app = Flask(__name__)
    app.config.from_object("app.config.Config")
    CORS(app)

    db.init_app(app)

    # ✅ REGISTER AUTH BLUEPRINT
    from app.routes.auth_routes import auth_bp
    app.register_blueprint(auth_bp, url_prefix="/auth")

    from app.routes.leave_routes import leave_bp
    app.register_blueprint(leave_bp)


    # OPTIONAL health check
    @app.route("/")
    def health():
        return "Backend running successfully"

    return app
