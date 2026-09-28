import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from './api';

function Register() {
    const navigate = useNavigate();
    const [form, setForm] = useState({ username: '', password: '', role: 1 });

    const register = async (e) => {
        if (e) e.preventDefault();
        try {            
            const response = await api.post('/users', { ...form });
            if (response.status === 201) {
                alert('User created successfully');
                setForm({ username: '', password: '', role: 1 });
                navigate('/login');
            }
        } catch (error) {
            alert(error.response?.data?.detail || 'User creation failed');
        }
    }; 

    return (
        <div className="container mt-4">
            <div className="card p-4 mx-auto" style={{ maxWidth: '500px' }}>
                <h2>Create User</h2>
                <form onSubmit={register}>
                    <label className="form-label" htmlFor="reg-username">Username</label>
                    <input
                        id="reg-username"
                        className="form-control mb-3"
                        value={form.username}
                        onChange={e => setForm({ ...form, username: e.target.value })}
                        required
                    />

                    <label className="form-label" htmlFor="reg-password">Password</label>
                    <input
                        id="reg-password"
                        type="password"
                        className="form-control mb-3"
                        value={form.password}
                        onChange={e => setForm({ ...form, password: e.target.value })}
                        required
                    />

                    <label className="form-label" htmlFor="reg-role">Role</label>
                    <select
                        id="reg-role"
                        className="form-select mb-3"
                        value={form.role}
                        onChange={e => setForm({ ...form, role: Number(e.target.value) })}
                    >
                        <option value="1">Employee</option>
                        <option value="2">Engineer</option>
                        <option value="3">Lead</option>
                        <option value="4">Admin</option>
                    </select>

                    <button type="submit" className="btn btn-primary w-100">
                        Create User
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Register;
