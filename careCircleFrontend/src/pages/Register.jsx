import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { isValidPassword } from "../utils/passwordValidation";
import PasswordInput from "../components/PasswordInput";
import { register } from "../api/authApi";
import logo from "../assets/logo.png";

export default function Register() {
  const navigate = useNavigate();

  const location = useLocation();
  const [form, setForm] = useState({
    role: location.state?.role || "ROLE_PARENT",
    email: "",
    password: ""
  });

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   const role = localStorage.getItem("role");
  //   if (token) {
  //     if (role === "ROLE_PARENT") navigate("/parent-dashboard");
  //     else if (role === "ROLE_CARETAKER") navigate("/nanny-profile");
  //     else if (role === "ROLE_ADMIN") navigate("/admin-dashboard");
  //     else navigate("/");
  //   }
  // }, [navigate]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const roles = [
    { value: "ROLE_PARENT", label: "👨‍👩‍👧 Parent", description: "Looking for childcare services" },
    { value: "ROLE_CARETAKER", label: "👩‍⚕️ Nanny/Caregiver", description: "Offering childcare services" },
    { value: "ROLE_ADMIN", label: "🛡️ Admin", description: "Platform administrator" }
  ];

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (!isValidPassword(form.password)) {
      setError("Password must be 8+ chars, with 2 numbers and 1 special symbol.");
      return;
    }

    try {
      setLoading(true);
      await register(form.email, form.password, form.role);

      setSuccess(true);
      setTimeout(() => {
        navigate("/verify-account", {
          state: {
            email: form.email,
            role: form.role
          }
        });
      }, 1500);

    } catch (error) {
      console.error("Registration error:", error);
      const msg = error.message.toLowerCase();
      if (/exist|already|taken|conflict/i.test(msg)) {
        setError("Email already exists. Please login.");
        setTimeout(() => navigate("/login", { state: { role: form.role } }), 2000);
      } else {
        setError(error.message || "Registration failed. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  const selectedRole = roles.find(r => r.value === form.role);

  return (
    <div className="min-h-screen pt-28 flex items-center justify-center p-6 font-sans">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[10%] right-[10%] w-[30%] h-[35%] bg-indigo-200/20 blur-[100px] rounded-full animate-float"></div>
        <div className="absolute bottom-[10%] left-[10%] w-[30%] h-[35%] bg-pink-200/20 blur-[100px] rounded-full animate-float" style={{ animationDelay: '-1.5s' }}></div>
      </div>

      <div className="relative z-10 w-full max-w-[540px] animate-fade-in-up">
        <div className="card-apple p-10 md:p-12 shadow-2xl">
          <div className="text-center mb-10">
            <img src={logo} alt="CareCircle Logo" className="w-20 h-20 mx-auto mb-6 shadow-lg rounded-2xl rotate-3" />
            <h2 className="text-3xl font-extrabold text-slate-900 mb-2">Join CareCircle</h2>
            <p className="text-slate-500 font-medium tracking-tight">Create your {form.role === "ROLE_PARENT" ? "parent" : "caregiver"} account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-700 ml-1 mb-2">Who are you?</label>
              <div className="flex justify-center p-1 bg-slate-100 rounded-xl mb-4">
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "ROLE_PARENT" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${form.role === "ROLE_PARENT" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Parent
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "ROLE_CARETAKER" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${form.role === "ROLE_CARETAKER" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Caregiver
                </button>
                <button
                  type="button"
                  onClick={() => setForm({ ...form, role: "ROLE_ADMIN" })}
                  className={`flex-1 py-2 rounded-lg text-sm font-bold transition-all ${form.role === "ROLE_ADMIN" ? "bg-white shadow-sm text-slate-900" : "text-slate-400 hover:text-slate-600"}`}
                >
                  Admin
                </button>
              </div>
              {selectedRole && <p className="mt-2 text-[11px] text-slate-500 italic px-3 py-1.5 bg-slate-50 rounded-lg border-l-2 border-indigo-500">{selectedRole.description}</p>}
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Email</label>
              <input name="email" type="email" value={form.email} onChange={handleChange} placeholder="name@example.com" required className="input-apple" />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-slate-700 ml-1">Password</label>
              <PasswordInput
                name="password"
                value={form.password}
                onChange={handleChange}
                placeholder="••••••••"
                showStrengthMeter={true}
                className="input-apple"
              />
            </div>

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="text-red-500 text-lg">⚠️</span>
                <p className="text-sm font-bold text-red-600">{error}</p>
              </div>
            )}

            {success && (
              <div className="p-4 bg-green-50 border border-green-100 rounded-2xl flex items-center gap-3 animate-in fade-in slide-in-from-top-2">
                <span className="text-green-500 text-lg">✅</span>
                <p className="text-sm font-bold text-green-600">Account created! Redirecting...</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className={`w-full py-4 rounded-2xl font-extrabold text-white transition-all shadow-xl active:scale-95 mt-4 bg-[#0071e3] hover:bg-[#0077ed]`}
            >
              {loading ? "Processing..." : "Register"}
            </button>
          </form>

          <div className="mt-8 pt-6 border-t border-slate-100 text-center">
            <p className="text-slate-500 text-sm font-medium">
              Already have an account?{" "}
              <button onClick={() => navigate("/login", { state: { role: form.role } })} className="font-bold text-indigo-600 hover:underline">Sign In</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
