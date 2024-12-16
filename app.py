from flask import Flask, render_template, redirect, request, url_for, session
import os

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Change this for security

# Hardcoded users (username: password)
USERS = {
    "user1": {"password": "password1", "role": "user"},
    "user2": {"password": "password2", "role": "user"},
    "admin": {"password": "adminpass", "role": "admin"}  # Special admin account
}

# Route for login
@app.route("/", methods=["GET", "POST"])
def login():
    if request.method == "POST":
        username = request.form["username"]
        password = request.form["password"]

        # Check username and password
        user = USERS.get(username)
        if user and user["password"] == password:
            session["username"] = username
            session["role"] = user["role"]
            return redirect(url_for("daily_work"))

        return "Invalid credentials. Try again."

    return render_template("login.html")

# Route for the daily work page (only logged-in users can access)
@app.route("/daily-work")
def daily_work():
    if not session.get("username"):
        return redirect(url_for("login"))

    return render_template("daily-work.html", username=session["username"], role=session["role"])

# Route for updating the daily work (only admin can access)
@app.route("/update-work", methods=["GET", "POST"])
def update_work():
    if session.get("role") != "admin":
        return "You are not authorized to access this page.", 403

    if request.method == "POST":
        # Handle the updated content (write to a file, database, etc.)
        updated_content = request.form["content"]
        with open("daily_work_content.txt", "w") as file:
            file.write(updated_content)

        return redirect(url_for("daily_work"))

    # Load current content
    try:
        with open("daily_work_content.txt", "r") as file:
            current_content = file.read()
    except FileNotFoundError:
        current_content = "No content available."

    return render_template("update-work.html", content=current_content)

# Route for logout
@app.route("/logout")
def logout():
    session.clear()
    return redirect(url_for("login"))

if __name__ == "__main__":
    app.run(debug=True)
