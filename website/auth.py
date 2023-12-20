from flask import Blueprint, render_template, request, flash

auth = Blueprint("auth", __name__)


@auth.route("/login", methods=["GET", "POST"])
def login():
    if request.method == 'POST':
        data = request.form
        print(data)
    return render_template("login.html")


@auth.route("/logout")
def logout():
    return "<p>Logout</p>"


@auth.route("/sign-up", methods=["GET", "POST"])
def sign_up():
    if request.method == 'POST':
        email = request.form.get('email')
        first_name = request.form.get('firstName')
        last_name = request.form.get('name')
        password = request.form.get('password')
        password_confirmation = request.form.get('password2')

        if password == password_confirmation:
            if len(password) < 7:
                flash("Das Passwort sollte länger als 7 Zeichen sein!", category='error')
            if len(first_name) < 2 or len(last_name) < 2:
                flash("Geben Sie einen längeren Namen ein!", category='error')
            else:
                #add user to database
                flash("Benutzer erfolgreich hinzugefügt!", category='success')
                pass
        else:
            flash("Passwörter stimmen nicht überein!", category='error')
        
    return render_template("signup.html")
