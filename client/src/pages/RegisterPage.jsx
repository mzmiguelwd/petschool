import React, { useRef, useState, useEffect, memo } from "react";
import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { motion } from "motion/react";
import { slipeUp } from "../utils/animation";
import { createUser } from "../api/users.api";
import {
  CheckCircle,
  XCircle,
  Info,
  Mail,
  User,
  Lock,
  Phone,
  MapPin,
  CreditCard,
  Loader2,
} from "lucide-react";

import NavbarLanding from "../components/NavbarLanding";
import Footer from "../components/Footer";

// --- Regular Expressions (Regex) ---

// Identification: 4-24 alphanumeric characters, dashes, or undescores. Must start with a letter/number.
const ID_REGEX = /^[A-Za-z0-9][A-Za-z0-9-_]{3,23}$/;
// Name/Last Name: 2-50 characters. Allows letters, accented charactes, and spaces.
const NAME_REGEX = /^[A-Za-zÀ-ÿ\s]{2,50}$/;
// Email: Standard email format.
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
// Phone: Exactly 10 digits, only numbers (0-9). No spaces, dashes, or leading '+'.
const PHONE_REGEX = /^[0-9]{10}$/;
// Password: Minimum 8, maximum 24 characters. Must include at least one lowercase letter, one uppercase letter, one digit, and one symbol (!@#$%^&*).
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,24}$/;
// Address: Allows alphanumeric characters, spaces, and specific punctuation for addresses. 6-80 characters.
const ADDRESS_REGEX = /^[a-zA-Z0-9\s\-\#\.\,ñÑ]{6,80}$/;

// --- Input Sub-Component (Re-usable component for form fields) ---
// Using 'memo' and 'forwardRed' to optimize performance and pass the ref from RHF.
const InputField = memo(
  React.forwardRef(
    (
      {
        id,
        label,
        placeholder,
        type = "text",
        icon: Icon, // Lucide-React Icon component passed as a prop
        note, // Validation instruction/tip
        required = true,
        hasError, // Boolean indicating if RHF found an error for this field
        isValid, // Boolean indicating if the field's value is valid
        errorMessage, // The error message to display (from RHF)
        fieldValue, // Valor actual del campo
        ...rest // Remaining props (e.g., onChange, onBlur from RHF's register)
      },
      ref // Ref forwarded by React Hook Form's 'register'
    ) => {
      const isInvalid = hasError && fieldValue.trim() !== ""; // Clearer variable name

      return (
        <div className="mb-4">
          {/* --- Input Label and Validation/Invalid Indicators --- */}
          <label
            htmlFor={id}
            className="flex text-sm font-semibold text-gray-700 mb-1 items-center"
          >
            {/* --- Icon rendering using Lucide-React component --- */}
            {Icon && (
              <Icon size={16} className="mr-2 text-[var(--primary-color)]" />
            )}
            {/* --- Indicator of required field --- */}
            {label} {required && <span className="text-red-600 ml-1">*</span>}
            {/* --- Valid Indicator (Green Check) --- */}
            <span
              className={`ml-2 text-green-600 transition-opacity duration-300 ${
                isValid ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Válido"
            >
              <CheckCircle size={16} />
            </span>
            {/* --- Invalid Indicator (Red X) --- */}
            <span
              className={`-ml-4 text-red-600 transition-opacity duration-300 ${
                isInvalid ? "opacity-100" : "opacity-0"
              }`}
              aria-label="Inválido"
            >
              <XCircle size={16} />
            </span>
          </label>

          {/* --- Main Input Field --- */}
          <input
            type={type}
            id={id}
            placeholder={placeholder}
            ref={ref}
            {...rest}
            required={required}
            // Control browser auto-fill for passwords
            autoComplete={
              type === "password" || id.includes("pwd") ? "new-password" : "off"
            }
            // ARIA attributes for accessibility
            aria-invalid={isValid ? "true" : "false"}
            aria-describedby={`${id}-note`}
            // Dynamic styling based on validation status
            className={`w-full p-3 border rounded-xl shadow-sm transition duration-150 font-inter text-gray-800 ${
              isInvalid
                ? "border-red-600 focus:ring-red-600"
                : isValid
                ? "border-gray-300 focus:ring-green-600"
                : "border-gray-300 focus:ring-gray-400"
            } focus:outline-none focus:ring-1 focus:border-transparent`}
          />

          {/* --- Validation Note/Instructions (Visible only if invalid) --- */}
          <div
            id={`${id}-note`}
            className={`mt-1 text-xs text-indigo-800 bg-indigo-50 p-2 rounded-lg transition-all duration-300 ${
              isInvalid ? "block" : "hidden"
            }`}
            aria-live="polite" // Announces changes to screen readers
          >
            <Info size={14} className="inline mr-1" />
            {note}
          </div>
        </div>
      );
    }
  )
);
// Assigning a display name for easier debugging in React DevTools
InputField.displayName = "InputField";
// --- End Input Sub-Component ---

const RegisterPage = () => {
  // Refs for focusing the first input and the error message area for accessibility
  const errRef = useRef(null);

  // Global state for displaying server or client-side errors
  const [errMsg, setErrMsg] = useState("");
  // State to show the success message post-submission
  const [success, setSuccess] = useState(false);
  // State for controlling the loading spinner and submit button enablement
  const [isLoading, setIsLoading] = useState(false);

  // --- CONFIGURACIÓN DE REACT HOOK FORM (RHF) ---
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors, isValid, isSubmitting },
  } = useForm({
    mode: "onChange",
  });

  // --- MONITOREO DE CAMPOS ---
  const passwordValue = watch("password", "");
  const firstInputRef = useRef(null);

  // --- Efecto para enfocar el primer campo ---
  useEffect(() => {
    firstInputRef.current?.focus();
  });

  // --- Efecto para limpiar el error ---
  useEffect(() => {
    setErrMsg("");
  }, [errors]);

  // --- Handles form submission for both creation and update ---
  const onSubmit = handleSubmit(async (data) => {
    console.log("Payload a enviar:", data);
    // Final client-side check just before submission

    setIsLoading(true);

    // --- Lógica de Creación (Llamada a la API) ---
    try {
      // --- Llama a la función que realiza el envío real a la API
      await createUser(data);

      // Manejo de éxito
      toast.success("Usuario creado correctamente.", {
        style: { background: "#101010", color: "#fff" },
      });

      // Muestra la vista de éxito
      setSuccess(true);
    } catch (error) {
      // --- Manejo de Error ---
      // Si el error es una validación de Django (400), muestra el primer error de DRF
      const apiErrors = error.response?.data;
      if (apiErrors) {
        // Encontrar el primer error para mostrarlo al usuario
        const firstErrorKey = Object.keys(apiErrors)[0];
        const firstErrorMessage = apiErrors[firstErrorKey][0];

        // Diccionario de nombres más legibles para el usuario
        const fieldLabels = {
          identification: "Documento de Identificación",
          first_name: "Nombre(s)",
          last_name: "Apellido(s)",
          email: "Correo Electrónico",
          phone: "Número Celular",
          address: "Dirección de Residencia",
          password: "Crear Contraseña",
          match_password: "Confirmar Contraseña",
        };

        // Buscar nombre legible
        const readableField = fieldLabels[firstErrorKey] || firstErrorKey;

        // Construir un mensaje más natural
        let customMessage = `Hubo un problema con ${readableField}: ${firstErrorMessage}`;
        if (readableField === fieldLabels.identification) {
          customMessage =
            "El Documento de Identificación ya existe en el sistema.";
        }

        setErrMsg(customMessage);
      } else {
        setErrMsg(
          "Ocurrió un error creando el usuario. Por favor inténtalo nuevamente."
        );
      }
      toast.error(
        "Ocurrió un error creando el usuario. Por favor inténtalo nuevamente.",
        {
          style: { background: "#101010", color: "#fff" },
        }
      );
    }

    setIsLoading(false);
  });

  // --- Función para renderizar campos ---
  const renderField = (props) => {
    let validationRules = {
      required: props.required ? "Este campo es obligatorio." : false,
    };

    // Añadir validación por patrón (Regex)
    let regex;
    let validationMessage = props.note;

    switch (props.id) {
      case "identification":
        regex = ID_REGEX;
        break;
      case "first_name":
        regex = NAME_REGEX;
        break;
      case "last_name":
        regex = NAME_REGEX;
        break;
      case "email":
        regex = EMAIL_REGEX;
        break;
      case "phone":
        regex = PHONE_REGEX;
        break;
      case "address":
        regex = ADDRESS_REGEX;
        break;
      case "password":
        regex = PWD_REGEX;
        validationMessage =
          "La contraseña no cumple con los requisitos de seguridad.";
        break;
      case "match_password":
        validationRules.validate = (value) =>
          value === passwordValue || "Las contraseñas no coinciden.";
        break;
      default:
        break;
    }

    if (regex && props.id !== "match_password") {
      const finalMessage =
        typeof validationMessage === "string"
          ? validationMessage.replace(/<[^>]*>?/gm, "")
          : validationMessage;
      validationRules.pattern = {
        value: regex,
        message: finalMessage, // Usamos la nota como mensaje de error limpio
      };
    }

    return (
      <InputField
        key={props.id}
        {...props}
        {...register(props.id, validationRules)}
        hasError={!!errors[props.id]}
        errorMessage={errors[props.id]?.message || props.note}
        isValid={!!watch(props.id) && !errors[props.id]}
        fieldValue={watch(props.id) || ""}
        // ref={props.id === "identification" ? firstInputRef : null}
      />
    );
  };

  return (
    <div className="bg-gray-50 pt-32">
      <NavbarLanding />

      <motion.section
        variants={slipeUp(0.3)}
        initial="initial"
        animate="animate"
        className="w-full max-w-2xl mx-auto bg-white p-8 rounded-2xl shadow-2xl border border-gray-100 mb-18"
      >
        {success ? (
          // --- Success View ---
          //
          <div className="text-center p-10">
            <CheckCircle className="mx-auto text-green-600 mb-4" size={48} />
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              ¡Registro Exitoso!
            </h1>
            <p>Tu cuenta ha sido creada. Ahora puedes iniciar sesión.</p>
            <Link
              to="/login"
              className="block mt-6 w-full py-3 px-4 rounded-xl border-2 shadow-lg font-bold cursor-pointer transition-all duration-200 text-[var(--primary-button)] hover:bg-[var(--primary-button)]/20"
            >
              Iniciar Sesión
            </Link>
          </div>
        ) : (
          // --- Registration Form View ---
          <motion.div
            variants={slipeUp(0.3)}
            initial="initial"
            animate="animate"
            className=""
          >
            <h1 className="text-3xl font-extrabold text-gray-900 text-center mb-6">
              Crea tu Cuenta
            </h1>
            {/* --- Error Message Display --- */}
            <p
              ref={errRef}
              className={`p-3 mb-4 rounded-xl text-center font-medium ${
                errMsg
                  ? "bg-red-100 text-red-700 border border-red-300"
                  : "sr-only" // Screen reader only if no error
              }`}
              aria-live="assertive" // Announces the error message immediately
              tabIndex="-1" // Makes it focusable for the ref
            >
              {errMsg}
            </p>

            {/* --- FORMULARIO CON RHF --- */}
            <form autoComplete="off" onSubmit={onSubmit} noValidate>
              {/* --- Documento de Identificación ---*/}
              {renderField({
                id: "identification",
                label: "Documento de Identificación",
                placeholder: "105607879",
                icon: CreditCard,
                note: "Debe contener de 4 a 24 caracteres (ej: 105607879).",
                required: true,
              })}

              {/* --- Nombre(s) y Apellido(s) --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField({
                  id: "first_name",
                  label: "Nombre(s)",
                  placeholder: "Juan Miguel",
                  icon: User,
                  note: "Debe contener solo letras y espacios, de 2 a 50 caracteres (ej: Juan Miguel).",
                  required: true,
                })}
                {renderField({
                  id: "last_name",
                  label: "Apellido(s)",
                  placeholder: "Manjarrez Zuluaga",
                  icon: User,
                  note: "Debe contener solo letras y espacios, de 2 a 50 caracteres (ej: Manjarrez Zuluaga).",
                  required: true,
                })}
              </div>

              {/* --- Email y Número Celular --- */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {renderField({
                  id: "email",
                  label: "Correo Electrónico",
                  placeholder: "usuario@dominio.com",
                  type: "email",
                  icon: Mail,
                  note: "Debe ser una dirección de correo electrónico válida (ej: usuario@dominio.com).",
                  required: true,
                })}
                {renderField({
                  id: "phone",
                  label: "Número Celular",
                  placeholder: "3150982340",
                  type: "tel",
                  icon: Phone,
                  note: "Debe contener 10 dígitos (ej: 3150982340).",
                  required: true,
                })}
              </div>

              {/* --- Dirección de Residencia --- */}
              {renderField({
                id: "address",
                label: "Dirección de Residencia",
                placeholder: "Calle 13 #100-00",
                icon: MapPin,
                note: "Debe contener mínimo 6 caracteres (ej: Calle 13 #100-00)",
                required: true,
                type: "tel",
              })}

              <hr className="my-6 border-gray-400" />

              {/* --- Contraseña --- */}
              {renderField({
                id: "password",
                label: "Crear Contraseña",
                icon: Lock,
                note: (
                  <>
                    Debe contener de 8 a 24 caracteres. Además, debe incluir:
                    <ul className="list-disc ml-4 mt-1 text-xs font-normal">
                      <li>Una letra minúscula</li>
                      <li>Una letra mayúscula</li>
                      <li>Un número</li>
                      <li>Un carácter especial permitido: ! @ # $ % ^ & *</li>
                    </ul>
                  </>
                ),
                required: true,
                type: "password",
              })}
              {renderField({
                id: "match_password",
                label: "Confirmar Contraseña",
                icon: Lock,
                note: "Debe coincidir exactamente con la contraseña anterior.",
                required: true,
                type: "password",
              })}

              {/* --- Botón de Envío --- */}
              <button
                type="submit"
                // Disable button if validation fails or if it's loading
                disabled={!isValid || isSubmitting || isLoading}
                className={`flex items-center justify-center mt-6 w-full py-3 px-4 rounded-xl font-semibold transition duration-200 shadow-md  
                  ${
                    isValid
                      ? `bg-[var(--primary-button)] text-white hover:bg-[var(--primary-button-hover)] cursor-pointer`
                      : "bg-[#a2c97b] text-gray-100 cursor-not-allowed"
                  }`}
              >
                {isLoading || isSubmitting ? (
                  // Show loading spinner during API call
                  <>
                    <Loader2 className="animate-spin mr-2" size={20} />
                    Registrando...
                  </>
                ) : (
                  "Crear cuenta"
                )}
              </button>
            </form>

            {/* --- Login link --- */}
            <p className="text-center mt-6 text-sm text-gray-600">
              ¿Ya tienes una cuenta?{" "}
              <Link
                to="/"
                className={`text-[var(--primary-color)] font-semibold hover:underline`}
              >
                Iniciar Sesión
              </Link>
            </p>
          </motion.div>
        )}
      </motion.section>

      <Footer />
    </div>
  );
};

export default RegisterPage;
