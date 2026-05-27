from flask import Flask, request, session, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from flask_cors import CORS
import os, secrets, random, string
from datetime import datetime, date

app = Flask(__name__)

# ─── CONFIG (use environment variables for cloud hosting) ──────────────────────
app.secret_key = os.environ.get('SECRET_KEY', 'change-this-in-production-use-env-var')

# PostgreSQL DATABASE_URL (set this in your hosting platform's env variables)
# Format: postgresql://user:password@host:port/dbname
# Example (Supabase): postgresql://postgres:yourpass@db.xxxx.supabase.co:5432/postgres
DATABASE_URL = os.environ.get('DATABASE_URL', '')

if DATABASE_URL:
    # Fix for some platforms that give 'postgres://' instead of 'postgresql://'
    if DATABASE_URL.startswith('postgres://'):
        DATABASE_URL = DATABASE_URL.replace('postgres://', 'postgresql://', 1)
    app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
else:
    # Fallback to SQLite for local dev
    BASE_DIR = os.path.abspath(os.path.dirname(__file__))
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///' + os.path.join(BASE_DIR, 'taxi_system.db')

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# ─── SESSION CONFIG (required for cross-device cookie sessions) ────────────────
app.config['SESSION_COOKIE_SAMESITE'] = 'None'
app.config['SESSION_COOKIE_SECURE'] = True   # Must be True when SameSite=None

# ─── CORS (allow your frontend domain) ────────────────────────────────────────
# Add your deployed frontend URL in ALLOWED_ORIGINS env variable
# e.g. ALLOWED_ORIGINS=https://your-app.vercel.app,https://your-app.netlify.app
allowed_origins_env = os.environ.get('ALLOWED_ORIGINS', '')
ALLOWED_ORIGINS = [o.strip() for o in allowed_origins_env.split(',') if o.strip()]
# Always allow localhost for local development
ALLOWED_ORIGINS += ["http://localhost:5173", "http://localhost:3000"]

CORS(app, supports_credentials=True, origins=ALLOWED_ORIGINS)

ADMIN_USER = os.environ.get('ADMIN_USER', 'admin')
ADMIN_PASS = os.environ.get('ADMIN_PASS', 'admin123')

db = SQLAlchemy(app)

# ─── MODELS ────────────────────────────────────────────────────────────────────
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    phone = db.Column(db.String(15), nullable=False)
    password = db.Column(db.String(200), nullable=False)

class Driver(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100))
    age = db.Column(db.Integer)
    phone = db.Column(db.String(50))
    email = db.Column(db.String(100))
    license = db.Column(db.String(50))
    expiry = db.Column(db.String(50))
    address = db.Column(db.String(200))
    notes = db.Column(db.Text)
    password = db.Column(db.String(200))
    experience = db.Column(db.String(50), default="0")
    is_online = db.Column(db.Boolean, default=False)
    trips = db.relationship('Trip', backref='driver', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id, 'name': self.name, 'age': self.age,
            'phone': self.phone, 'email': self.email, 'license': self.license,
            'expiry': self.expiry, 'address': self.address, 'notes': self.notes,
            'experience': self.experience, 'is_online': self.is_online
        }

class Car(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    make = db.Column(db.String(100))
    model = db.Column(db.String(100))
    year = db.Column(db.String(10))
    license_plate = db.Column(db.String(50))
    insurance_no = db.Column(db.String(50))
    color = db.Column(db.String(50))
    seating_capacity = db.Column(db.Integer)
    notes = db.Column(db.Text)
    status = db.Column(db.String(50), default="available")
    emi_date = db.Column(db.String(50), nullable=True)
    service_date = db.Column(db.String(50), nullable=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'), nullable=True)
    trips = db.relationship('Trip', backref='car', cascade="all, delete-orphan")

    def to_dict(self):
        return {
            'id': self.id, 'make': self.make, 'model': self.model,
            'year': self.year, 'license_plate': self.license_plate,
            'insurance_no': self.insurance_no, 'color': self.color,
            'seating_capacity': self.seating_capacity, 'notes': self.notes,
            'status': self.status, 'emi_date': self.emi_date,
            'service_date': self.service_date, 'driver_id': self.driver_id
        }

class Trip(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    driver_id = db.Column(db.Integer, db.ForeignKey('driver.id'))
    car_id = db.Column(db.Integer, db.ForeignKey('car.id'))
    pickup_location = db.Column(db.String(200))
    drop_location = db.Column(db.String(200))
    trip_date = db.Column(db.String(50))
    distance_km = db.Column(db.Float)
    fare_type = db.Column(db.String(50))
    car_type = db.Column(db.String(50))
    total_fare = db.Column(db.Float)
    customer_name = db.Column(db.String(100))
    customer_email = db.Column(db.String(100))
    customer_phone = db.Column(db.String(50))
    customer_age = db.Column(db.Integer)
    notes = db.Column(db.Text)
    passengers_accompanying = db.Column(db.Integer)
    status = db.Column(db.String(50), default="Pending")
    otp = db.Column(db.String(10))
    created_at = db.Column(db.String(50))

    def to_dict(self):
        return {
            'id': self.id,
            'driver_id': self.driver_id,
            'driver_name': self.driver.name if self.driver else None,
            'car_id': self.car_id,
            'car_make': self.car.make if self.car else None,
            'car_model': self.car.model if self.car else None,
            'car_plate': self.car.license_plate if self.car else None,
            'pickup_location': self.pickup_location,
            'drop_location': self.drop_location,
            'trip_date': self.trip_date,
            'distance_km': self.distance_km,
            'fare_type': self.fare_type,
            'car_type': self.car_type,
            'total_fare': self.total_fare,
            'customer_name': self.customer_name,
            'customer_email': self.customer_email,
            'customer_phone': self.customer_phone,
            'customer_age': self.customer_age,
            'notes': self.notes,
            'passengers_accompanying': self.passengers_accompanying,
            'status': self.status,
            'otp': self.otp,
            'created_at': self.created_at,
        }

with app.app_context():
    db.create_all()
    # SQLite-only migrations (skip for PostgreSQL - db.create_all handles it)
    if 'sqlite' in app.config['SQLALCHEMY_DATABASE_URI']:
        from sqlalchemy import text
        migrations = [
            "ALTER TABLE driver ADD COLUMN password VARCHAR(200)",
            "ALTER TABLE driver ADD COLUMN experience VARCHAR(50) DEFAULT '0'",
            "ALTER TABLE driver ADD COLUMN is_online BOOLEAN DEFAULT 0",
            "ALTER TABLE trip ADD COLUMN status VARCHAR(50) DEFAULT 'Pending'",
            "ALTER TABLE trip ADD COLUMN otp VARCHAR(10)",
            "ALTER TABLE trip ADD COLUMN created_at VARCHAR(50)",
            "ALTER TABLE car ADD COLUMN driver_id INTEGER",
        ]
        with db.engine.connect() as conn:
            for sql in migrations:
                try:
                    conn.execute(text(sql))
                    conn.commit()
                except Exception:
                    conn.rollback()

# ─── SESSION ───────────────────────────────────────────────────────────────────
@app.route('/api/session')
def get_session():
    return jsonify({
        'user_email': session.get('user_email'),
        'user_logged_in': session.get('user_logged_in', False),
        'admin_logged_in': session.get('admin_logged_in', False),
        'driver_logged_in': session.get('driver_logged_in', False),
        'driver_id': session.get('driver_id'),
        'driver_name': session.get('driver_name'),
    })

# ─── AUTH ──────────────────────────────────────────────────────────────────────
@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    username_email = data.get('username', '')
    password = data.get('password', '')

    if username_email == ADMIN_USER and password == ADMIN_PASS:
        session['admin_logged_in'] = True
        return jsonify({'success': True, 'message': 'Admin logged in!',
                        'session': {'admin_logged_in': True, 'user_email': None}})

    user = User.query.filter(
        (User.username == username_email) | (User.email == username_email)
    ).first()
    if user and check_password_hash(user.password, password):
        session['user_logged_in'] = True
        session['user_email'] = user.email
        return jsonify({'success': True, 'message': f'Welcome {user.username}!',
                        'session': {'user_logged_in': True, 'user_email': user.email, 'admin_logged_in': False}})

    return jsonify({'success': False, 'message': 'Invalid credentials'})

@app.route('/api/driver/login', methods=['POST'])
def driver_login():
    data = request.get_json()
    phone_or_email = data.get('username', '')
    password = data.get('password', '')
    driver = Driver.query.filter(
        (Driver.phone == phone_or_email) | (Driver.email == phone_or_email)
    ).first()
    if not driver:
        return jsonify({'success': False, 'message': 'Driver not found'})
    if not driver.password:
        return jsonify({'success': False, 'message': 'No password set. Contact admin.'})
    if not check_password_hash(driver.password, password):
        return jsonify({'success': False, 'message': 'Invalid password'})
    session['driver_logged_in'] = True
    session['driver_id'] = driver.id
    session['driver_name'] = driver.name
    return jsonify({
        'success': True,
        'message': f'Welcome {driver.name}!',
        'session': {
            'driver_logged_in': True,
            'driver_id': driver.id,
            'driver_name': driver.name,
        }
    })

@app.route('/api/logout', methods=['POST'])
def logout():
    session.clear()
    return jsonify({'success': True})

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email', '')
    password = data.get('password', '')
    username = data.get('username', '')
    phone = data.get('phone', '')
    if User.query.filter_by(email=email).first():
        return jsonify({'success': False, 'message': 'Email already registered'})
    hashed = generate_password_hash(password)
    user = User(username=username, email=email, phone=phone, password=hashed)
    db.session.add(user)
    db.session.commit()
    session['user_logged_in'] = True
    session['user_email'] = email
    return jsonify({'success': True, 'message': 'Registered successfully!',
                    'session': {'user_logged_in': True, 'user_email': email, 'admin_logged_in': False}})

# ─── DRIVERS ──────────────────────────────────────────────────────────────────
@app.route('/api/drivers', methods=['GET'])
def get_drivers():
    return jsonify([d.to_dict() for d in Driver.query.all()])

@app.route('/api/drivers', methods=['POST'])
def create_driver():
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    data = request.get_json()
    pwd = data.get('password')
    hashed_pwd = generate_password_hash(pwd) if pwd else None
    driver = Driver(
        name=data.get('name'), age=data.get('age'), phone=data.get('phone'),
        email=data.get('email'), license=data.get('license'), expiry=data.get('expiry'),
        address=data.get('address'), notes=data.get('notes'),
        experience=data.get('experience', '0'), password=hashed_pwd
    )
    db.session.add(driver)
    db.session.commit()
    return jsonify({'success': True, 'driver': driver.to_dict()})

@app.route('/api/drivers/<int:driver_id>', methods=['PUT'])
def update_driver(driver_id):
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    driver = Driver.query.get_or_404(driver_id)
    data = request.get_json()
    driver.name = data.get('name', driver.name)
    driver.age = data.get('age', driver.age)
    driver.phone = data.get('phone', driver.phone)
    driver.email = data.get('email', driver.email)
    driver.license = data.get('license', driver.license)
    driver.expiry = data.get('expiry', driver.expiry)
    driver.address = data.get('address', driver.address)
    driver.notes = data.get('notes', driver.notes)
    driver.experience = data.get('experience', driver.experience)
    if data.get('password'):
        driver.password = generate_password_hash(data['password'])
    db.session.commit()
    return jsonify({'success': True, 'driver': driver.to_dict()})

@app.route('/api/drivers/<int:driver_id>', methods=['DELETE'])
def delete_driver(driver_id):
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    driver = Driver.query.get_or_404(driver_id)
    db.session.delete(driver)
    db.session.commit()
    return jsonify({'success': True})

# ─── CARS ─────────────────────────────────────────────────────────────────────
@app.route('/api/cars', methods=['GET'])
def get_cars():
    return jsonify([c.to_dict() for c in Car.query.all()])

@app.route('/api/cars', methods=['POST'])
def create_car():
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    data = request.get_json()
    car = Car(
        make=data.get('make'), model=data.get('model'), year=data.get('year'),
        license_plate=data.get('license_plate'), insurance_no=data.get('insurance_no'),
        color=data.get('color'), seating_capacity=data.get('seating_capacity'),
        notes=data.get('notes'), status=data.get('status', 'available'),
        emi_date=data.get('emi_date') or None, service_date=data.get('service_date') or None,
        driver_id=data.get('driver_id') or None
    )
    db.session.add(car)
    db.session.commit()
    return jsonify({'success': True, 'car': car.to_dict()})

@app.route('/api/cars/<int:car_id>', methods=['PUT'])
def update_car(car_id):
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    car = Car.query.get_or_404(car_id)
    data = request.get_json()
    for field in ['make','model','year','license_plate','insurance_no','color','seating_capacity','notes','status','driver_id']:
        if field in data:
            setattr(car, field, data[field] or None if field == 'driver_id' else data[field])
    if 'emi_date' in data: car.emi_date = data['emi_date'] or None
    if 'service_date' in data: car.service_date = data['service_date'] or None
    db.session.commit()
    return jsonify({'success': True, 'car': car.to_dict()})

@app.route('/api/cars/<int:car_id>', methods=['DELETE'])
def delete_car(car_id):
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    car = Car.query.get_or_404(car_id)
    db.session.delete(car)
    db.session.commit()
    return jsonify({'success': True})

# ─── TRIPS ────────────────────────────────────────────────────────────────────
@app.route('/api/trips', methods=['GET'])
def get_trips():
    if not session.get('admin_logged_in'):
        return jsonify({'success': False, 'message': 'Admin only'}), 403
    return jsonify([t.to_dict() for t in Trip.query.all()])

@app.route('/api/my_trips', methods=['GET'])
def my_trips():
    if not session.get('user_email'):
        return jsonify({'success': False, 'message': 'Login required'}), 401
    trips = Trip.query.filter_by(customer_email=session['user_email']).all()
    return jsonify([t.to_dict() for t in trips])

@app.route('/api/booknow', methods=['POST'])
def booknow():
    if not session.get('user_email'):
        return jsonify({'success': False, 'message': 'Please login to book'}), 401
    data = request.get_json()
    distance_km = float(data.get('distance_km', 0))
    car_type = data.get('car_type', 'ac')
    fare_type = data.get('fare_type', 'per_km')
    driver_charge = 300
    padi_charge = 500
    if fare_type == "per_km":
        rate = 13 if car_type == "ac" else 12
        total_fare = distance_km * rate + driver_charge + padi_charge
    else:
        base = 1200 if car_type == "ac" else 1000
        extra = max(0, distance_km - 250) * (13 if car_type == "ac" else 12)
        total_fare = base + extra + driver_charge + padi_charge

    otp = ''.join(random.choices(string.digits, k=6))
    trip = Trip(
        driver_id=data.get('driver_id'),
        car_id=data.get('car_id'),
        pickup_location=data.get('pickup_location'),
        drop_location=data.get('drop_location'),
        trip_date=data.get('trip_date'),
        distance_km=distance_km,
        fare_type=fare_type,
        car_type=car_type,
        total_fare=total_fare,
        customer_name=data.get('customer_name'),
        customer_email=session['user_email'],
        customer_phone=data.get('customer_phone'),
        customer_age=int(data.get('customer_age', 0)),
        notes=data.get('trip_notes', ''),
        passengers_accompanying=int(data.get('passengers_accompanying', 1)),
        status='Pending',
        otp=otp,
        created_at=datetime.now().strftime('%Y-%m-%d %H:%M:%S')
    )
    db.session.add(trip)
    car = Car.query.get(data.get('car_id'))
    if car:
        car.status = 'booked'
    db.session.commit()
    return jsonify({'success': True, 'message': 'Booking confirmed!', 'trip': trip.to_dict(), 'otp': otp})

# ─── DRIVER PANEL APIs ────────────────────────────────────────────────────────
@app.route('/api/driver/profile', methods=['GET'])
def driver_profile():
    if not session.get('driver_logged_in'):
        return jsonify({'success': False, 'message': 'Driver login required'}), 401
    driver = Driver.query.get(session['driver_id'])
    if not driver:
        return jsonify({'success': False, 'message': 'Driver not found'}), 404
    car = Car.query.filter_by(driver_id=driver.id).first()
    profile = driver.to_dict()
    profile['car'] = car.to_dict() if car else None
    return jsonify(profile)

@app.route('/api/driver/toggle_status', methods=['POST'])
def toggle_driver_status():
    if not session.get('driver_logged_in'):
        return jsonify({'success': False, 'message': 'Driver login required'}), 401
    driver = Driver.query.get(session['driver_id'])
    driver.is_online = not driver.is_online
    db.session.commit()
    return jsonify({'success': True, 'is_online': driver.is_online})

@app.route('/api/driver/trips', methods=['GET'])
def driver_trips():
    if not session.get('driver_logged_in'):
        return jsonify({'success': False, 'message': 'Driver login required'}), 401
    trips = Trip.query.filter_by(driver_id=session['driver_id']).order_by(Trip.id.desc()).all()
    return jsonify([t.to_dict() for t in trips])

@app.route('/api/driver/trips/<int:trip_id>/action', methods=['POST'])
def driver_trip_action(trip_id):
    if not session.get('driver_logged_in'):
        return jsonify({'success': False, 'message': 'Driver login required'}), 401
    trip = Trip.query.get_or_404(trip_id)
    if trip.driver_id != session['driver_id']:
        return jsonify({'success': False, 'message': 'Not your trip'}), 403
    data = request.get_json()
    action = data.get('action')
    if action == 'accept':
        trip.status = 'Accepted'
    elif action == 'reject':
        trip.status = 'Rejected'
    elif action == 'reached_pickup':
        trip.status = 'Reached Pickup'
    elif action == 'start':
        otp_input = data.get('otp', '')
        if otp_input != trip.otp:
            return jsonify({'success': False, 'message': 'Incorrect OTP'})
        trip.status = 'Trip Started'
    elif action == 'complete':
        trip.status = 'Trip Completed'
        car = Car.query.get(trip.car_id)
        if car:
            car.status = 'available'
    elif action == 'cancel':
        trip.status = 'Cancelled'
        car = Car.query.get(trip.car_id)
        if car:
            car.status = 'available'
    db.session.commit()
    return jsonify({'success': True, 'trip': trip.to_dict()})

@app.route('/api/driver/dashboard', methods=['GET'])
def driver_dashboard():
    if not session.get('driver_logged_in'):
        return jsonify({'success': False, 'message': 'Driver login required'}), 401
    driver_id = session['driver_id']
    today = date.today().strftime('%Y-%m-%d')
    all_trips = Trip.query.filter_by(driver_id=driver_id).all()
    today_trips = [t for t in all_trips if t.trip_date and t.trip_date.startswith(today)]
    completed = [t for t in all_trips if t.status == 'Trip Completed']
    today_completed = [t for t in today_trips if t.status == 'Trip Completed']
    pending = [t for t in all_trips if t.status == 'Pending']
    today_earnings = sum(t.total_fare or 0 for t in today_completed)

    from datetime import timedelta
    week_ago = (date.today() - timedelta(days=7)).strftime('%Y-%m-%d')
    month_ago = (date.today() - timedelta(days=30)).strftime('%Y-%m-%d')
    weekly_completed = [t for t in completed if t.trip_date and t.trip_date >= week_ago]
    monthly_completed = [t for t in completed if t.trip_date and t.trip_date >= month_ago]
    weekly_earnings = sum(t.total_fare or 0 for t in weekly_completed)
    monthly_earnings = sum(t.total_fare or 0 for t in monthly_completed)

    driver = Driver.query.get(driver_id)
    return jsonify({
        'today_trips': len(today_trips),
        'pending_trips': len(pending),
        'completed_trips': len(completed),
        'today_earnings': today_earnings,
        'weekly_earnings': weekly_earnings,
        'monthly_earnings': monthly_earnings,
        'is_online': driver.is_online,
        'driver_name': driver.name,
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000)
