import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager
from flask_cors import CORS
from dotenv import load_dotenv
from urllib.parse import quote_plus

db = SQLAlchemy()
jwt = JWTManager()

def create_app():
    load_dotenv()

    app = Flask(__name__)

    # 🔹 Database Config
    DB_USER = os.getenv("DB_USER")
    DB_PASSWORD = quote_plus(os.getenv("DB_PASSWORD"))
    DB_HOST = os.getenv("DB_HOST")
    DB_NAME = os.getenv("DB_NAME")

    app.config["SQLALCHEMY_DATABASE_URI"] = (
        f"mysql+pymysql://{DB_USER}:{DB_PASSWORD}@{DB_HOST}/{DB_NAME}"
    )
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

    # 🔹 JWT Config
    app.config["JWT_SECRET_KEY"] = os.getenv("SECRET_KEY")

    # 🔹 Initialize Extensions
    db.init_app(app)
    jwt.init_app(app)
    CORS(app)   # ✅ Enable CORS for frontend

    # 🔹 Register Blueprints
    from app.routes.auth_routes import auth_bp
    from app.routes.attendance_routes import attendance_bp

    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(attendance_bp, url_prefix="/api/attendance")

    return app
