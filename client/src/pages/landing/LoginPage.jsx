import React, {
  useRef,
  useState,
  useEffect,
  memo,
  useContext,
  useCallback,
} from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import { slipeUp } from "../../components/landing/utils/animations";
import { Mail, Lock, Loader2, Info, UserCircle2, LogOut } from "lucide-react";
import { usersApi } from "../../api/users.api";
import ReCAPTCHA from "react-google-recaptcha";
import useAuth from "../../hooks/useAuth";
import LandingHeader from "../../components/landing/LandingHeader";
import LandingFooter from "../../components/landing/LandingFooter";
import AuthContext from "../../context/AuthProvider";

// ========== Input Sub-Component ==========
const InputField = memo(
  React.forwardRef(
    (
      {
        id,
        label,
        placeholder,
        type = "text",
        icon: Icon,
        value,
        onChange,
        required = true,
        ...rest
      },
      ref
    ) => {
      return (
        <div className="mb-4">
          <label
            htmlFor={id}
            className="flex text-sm font-semibold text-gray-700 mb-1 items-center"
          >
            {Icon && (
              <Icon size={16} className="mr-2 text-[var(--primary-color)]" />
            )}
            {label} {required && <span className="text-red-600 ml-1">*</span>}
          </label>

          <input
            type={type}
            id={id}
            placeholder={placeholder}
            ref={ref}
            value={value}
            onChange={onChange}
            required={required}
            autoComplete={type === "password" ? "current-password" : "username"}
            className="w-full p-3 border border-gray-300 rounded-xl shadow-sm transition duration-150 font-inter text-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-transparent"
            {...rest}
          />
        </div>
      );
    }
  )
);
InputField.displayName = "InputField";

const LOGIN_URL = "/users/auth/login/";

const LoginPage = () => {
  const isTest = false
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const userRef = useRef(null);
  const errRef = useRef(null);

  const captchaRef = useRef(null); //ref para el captcha

  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado de carga
  const [captchaToken, setCaptchaToken] = useState(""); // Estado para el token


  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, password]);

  // Efecto para enfocar el error si existe
  useEffect(() => {
    if (errMsg) {
      errRef.current?.focus();
      toast.error(errMsg, {
        style: { background: "#101010", color: "#fff" },
      });
    }
  }, [errMsg]);

  // Maneja el cambio del captcha
  const handleCaptchaChange = (token) => {
      setCaptchaToken(token);
  }; 

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // === PASO 1: Validar la existencia del token de CAPTCHA ===
    const currentCaptchaToken = captchaRef.current?.value || captchaRef.current?.getValue();

    if (!currentCaptchaToken) {
      setErrMsg("Por favor, completa la verificación CAPTCHA.");
      setIsLoading(false);
      errRef.current.focus();
      return;
    }

    try {
      const payload = {
        email: user,
        password: password,
        "g-recaptcha-response": currentCaptchaToken, // Lo que Django esperará
      };

      console.log("Payload a enviar:", payload);
      const response = await usersApi.post(LOGIN_URL, payload);
      console.log(JSON.stringify(response?.data));

      // --- Tokens recibidos del backend ---
      const accessToken = response?.data?.access;
      const roles = response?.data?.roles;

      // --- Obtener los datos del usuario autenticado ---
      const userResponse = await usersApi.get("/users/me/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });

      const userData = userResponse.data;
      console.log("Datos del usuario autenticado:", userData);

      // --- Guardar en el contexto global ---
      setAuth({ user: userData, accessToken });

      const userRole = userData.role;
      let targetPath = "/";

      switch (userRole) {
        case "cliente":
          targetPath = "/cliente/dashboard";
          break;
        case "director":
          targetPath = "/director/dashboard";
          break;
        case "admin":
          targetPath = "/admin/dashboard";
          break;
        default:
          targetPath = "/unauthorized";
          break;
      }

      // --- Limpieza
      setUser("");
      setPassword("");
      if (captchaRef.current) {
        // Si existe el método reset, lo llamamos
        if (typeof captchaRef.current.reset === "function") {
          captchaRef.current.reset();
        } else {
          // En test, es un input oculto, limpiamos su value manualmente
          captchaRef.current.value = "";
        }
      }

      // notificación ---
      toast.success("¡Inicio de sesión exitoso!", {
        style: { background: "#101010", color: "#fff" },
      });

      navigate(targetPath, { replace: true });
    } catch (err) {
      console.error("Error en el login:", err);
      if (captchaRef.current) {
        // Si existe el método reset, lo llamamos
        if (typeof captchaRef.current.reset === "function") {
          captchaRef.current.reset();
        } else {
          // En test, es un input oculto, limpiamos su value manualmente
          captchaRef.current.value = "";
        }
      }

      if (err.response) {
        // El servidor respondió con un código fuera del rango 2xx
        if (err.response?.status === 400) {
          if (detail && detail.includes("CAPTCHA")) {
              setErrMsg(detail); // Mostrar mensaje específico de Django si existe
          } else {
              setErrMsg("Faltan credenciales o CAPTCHA inválido.");
          }
        } else if (err.response?.status === 401) {
          setErrMsg("Credenciales Inválidas");
        } else {
          setErrMsg(`Error del servidor: ${err.response.status}`);
        }
      } else if (err.request) {
        // La solicitud fue hecha pero no hubo respuesta
        setErrMsg("No Server Response");
      } else {
        // Algo falló al configurar la solicitud
        setErrMsg("Error en la configuración de la solicitud");
      }
      errRef.current.focus();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 pt-32 min-h-screen">
      <LandingHeader />

      <motion.section
        variants={slipeUp(0.3)}
        initial="initial"
        animate="animate"
        className="w-full max-w-md mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mb-18"
      >
        <motion.div
          variants={slipeUp(0.3)}
          initial="initial"
          animate="animate"
          className=""
        >
          <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
            Iniciar Sesión
          </h1>

          <p
            ref={errRef}
            className={`p-3 mb-4 rounded-xl text-center font-medium transition-all duration-300 ${
              errMsg
                ? "bg-red-100 text-red-700 border border-red-300 block"
                : "sr-only" // Screen reader only if no error
            }`}
            aria-live="assertive"
            tabIndex="-1" // Hace que sea enfocable para el ref
          >
            <Info size={16} className="inline mr-2" />
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            {/* ========== Email ========== */}
            <InputField
              id="username"
              label="Email"
              placeholder="tu.usuario@email.com"
              icon={Mail}
              type="text"
              value={user}
              onChange={(e) => setUser(e.target.value)}
              ref={userRef}
              required
            />

            {/* ========== Contraseña ========== */}
            <InputField
              id="password"
              label="Contraseña"
              placeholder="Ingresa tu contraseña"
              icon={Lock}
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            {/* ========== ReCAPTCHA v2 Widget ========== 6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI*/ }
            <div className="mt-4 mb-6">
              {!isTest ? (
                <ReCAPTCHA
                  sitekey="6LdDQyYsAAAAAHb3rN5nFINtylLxy1C64_oqi8vj" // tu sitekey real
                  ref={captchaRef}
                />
              ) : (
                // En test, no mostramos CAPTCHA pero ponemos un token simulado
                <input type="hidden" name="g-recaptcha-response" value="test-token" ref={captchaRef} />
              )}
            </div>

            {/* ========== Botón ========== */}
            <button
              type="submit"
              disabled={isLoading || !user || !password} // Deshabilita si carga o campos vacíos
              className={`flex items-center justify-center mt-6 w-full py-3 px-4 rounded-xl font-semibold transition duration-200 shadow-md 
                ${
                  !user || !password || isLoading // Estilo de deshabilitado si falta algo o está cargando
                    ? "bg-[#a2c97b] text-gray-100 cursor-not-allowed"
                    : `bg-[var(--primary-button)] text-white hover:bg-[var(--primary-button-hover)] cursor-pointer`
                }`}
            >
              {isLoading ? (
                // Muestra spinner de carga
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Iniciando...
                </>
              ) : (
                "Iniciar Sesión"
              )}
            </button>
          </form>

          {/* ========== Enlace a Registro ========== */}
          <p className="text-center mt-6 text-sm text-gray-600">
            ¿Necesitas una cuenta?{" "}
            <Link
              to="/register"
              className={`text-[var(--primary-color)] font-semibold hover:underline`}
            >
              Regístrate aquí
            </Link>
          </p>
        </motion.div>
      </motion.section>

      <LandingFooter />
    </div>
  );
};

export default LoginPage;
