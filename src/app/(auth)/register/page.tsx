"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { User, Building2, Layers, ChevronLeft, Eye, EyeOff, Loader2, Check } from "lucide-react";
import styles from "./page.module.css";

type Category = "standalone_teacher" | "offline_institution" | "edtech" | null;

const CARDS = [
  {
    id: "standalone_teacher",
    icon: User,
    title: "Solo Teacher / Tutor",
    desc: "I teach independently and manage my own students.",
  },
  {
    id: "offline_institution",
    icon: Building2,
    title: "Coaching Institute or School",
    desc: "I run a physical or hybrid institute with staff and batches.",
  },
  {
    id: "edtech",
    icon: Layers,
    title: "EdTech Company",
    desc: "I run an online education business with multiple instructors.",
  }
] as const;

export default function RegisterFlow() {
  const [step, setStep] = useState<1 | 2>(1);
  const [direction, setDirection] = useState<"right" | "left">("right");

  // Screen 1 State
  const [category, setCategory] = useState<Category>(null);

  // Screen 2 State
  const [formData, setFormData] = useState({
    full_name: "",
    institute_name: "",
    email: "",
    phone: "",
    password: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Subdomain generation logic (debounced)
  const [slug, setSlug] = useState("");
  useEffect(() => {
    const timer = setTimeout(() => {
      if (formData.institute_name) {
        const generated = formData.institute_name
          .toLowerCase()
          .replace(/[^a-z0-9 ]/g, "")
          .replace(/\s+/g, "-")
          .substring(0, 30);
        // remove trailing hyphens
        setSlug(generated.replace(/-+$/, ""));
      } else {
        setSlug("");
      }
    }, 400);
    return () => clearTimeout(timer);
  }, [formData.institute_name]);

  const handleNextStep = () => {
    if (category) {
      setDirection("right");
      setStep(2);
      window.scrollTo(0, 0);
    }
  };

  const handlePrevStep = () => {
    setDirection("left");
    setStep(1);
    window.scrollTo(0, 0);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error for the field being typed in
    if (errors[name]) {
      setErrors((prev) => {
        const newErrs = { ...prev };
        delete newErrs[name];
        return newErrs;
      });
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (formData.full_name.trim().length < 2) {
      newErrors.full_name = "Required, min 2 chars";
    }
    if (formData.institute_name.trim().length < 2) {
      newErrors.institute_name = "Required, min 2 chars";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Invalid email format";
    }
    if (!/^[0-9]{10}$/.test(formData.phone)) {
      newErrors.phone = "Must be a 10-digit Indian number";
    }
    if (formData.password.length < 8) {
      newErrors.password = "Required, min 8 chars";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Mock API Request as requested
      const payload = {
        ...formData,
        category,
      };
      console.log("Submitting:", payload);

      setTimeout(() => {
        setIsSubmitting(false);
        setIsSuccess(true);
        // Simulated redirect
        setTimeout(() => {
           console.log("Redirecting to dashboard...");
           // router.push('/dashboard');
        }, 1000);
      }, 1500);
    }
  };

  const getDynamicHeading = () => {
    switch (category) {
      case "standalone_teacher": return "Set up your teaching profile";
      case "offline_institution": return "Set up your institute";
      case "edtech": return "Set up your EdTech platform";
      default: return "Create your account";
    }
  };

  const getDynamicInstituteLabel = () => {
    switch (category) {
      case "standalone_teacher": return "Your teaching brand name";
      case "offline_institution": return "Institute name";
      case "edtech": return "Company / platform name";
      default: return "Institute name";
    }
  };

  const getDynamicInstitutePlaceholder = () => {
    switch (category) {
      case "standalone_teacher": return "e.g. Ravi Physics Classes";
      case "offline_institution": return "e.g. Brilliance Academy";
      case "edtech": return "e.g. SkillPath Learning";
      default: return "Institute name";
    }
  };

  const animationClass = direction === "right" ? styles.slideInRight : styles.slideInLeft;

  return (
    <div className={styles.pageWrapper}>
      {/* Header */}
      <header className={`${styles.header} ${step === 1 ? styles.headerCenter : ""}`}>
        {step === 2 && (
          <button onClick={handlePrevStep} className={styles.backButton} aria-label="Go back">
            <ChevronLeft size={24} />
          </button>
        )}
        <div className={styles.logo}>edveo</div>
      </header>

      {/* Main Content Area */}
      <main className={styles.mainContent}>
        {/* Progress Dots */}
        <div className={styles.progressIndicator} aria-hidden="true">
          <div className={`${styles.dot} ${step >= 1 ? styles.dotActive : ""}`} />
          <div className={`${styles.dot} ${step >= 2 ? styles.dotActive : ""}`} />
        </div>

        {/* Screen 1 */}
        {step === 1 && (
          <div className={`${styles.screenContainer} ${animationClass}`}>
            <h1 className={styles.heading}>How will you use Edveo?</h1>
            <p className={styles.subheading}>
              We&apos;ll set up your dashboard based on your answer.
            </p>

            <div className={styles.cardsGrid} role="radiogroup" aria-label="Select your user category">
              {CARDS.map((card) => {
                const Icon = card.icon;
                const isSelected = category === card.id;
                
                return (
                  <div
                    key={card.id}
                    role="radio"
                    aria-checked={isSelected}
                    tabIndex={0}
                    className={`${styles.card} ${isSelected ? styles.cardSelected : ""}`}
                    onClick={() => setCategory(card.id)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        setCategory(card.id);
                      }
                    }}
                  >
                    {isSelected && <Check className={styles.cardCheck} size={20} />}
                    <Icon className={styles.cardIcon} size={28} />
                    <h2 className={styles.cardTitle}>{card.title}</h2>
                    <p className={styles.cardDesc}>{card.desc}</p>
                  </div>
                );
              })}
            </div>

            <button
              className={`${styles.primaryButton} ${styles.buttonDesktopCenter}`}
              disabled={!category}
              onClick={handleNextStep}
              aria-disabled={!category}
            >
              Continue
            </button>

            <p className={styles.footerText}>
              Already have an account?{" "}
              <Link href="/login" className={styles.linkGreen}>
                Log in
              </Link>
            </p>
          </div>
        )}

        {/* Screen 2 */}
        {step === 2 && (
          <div className={`${styles.screenContainer} ${animationClass}`}>
            <h1 className={styles.heading}>{getDynamicHeading()}</h1>
            <p className={styles.subheading}>
              You&apos;re 30 seconds away from your free 14-day trial.
            </p>

            <form className={styles.formContainer} onSubmit={handleSubmit} noValidate>
              
              <div className={styles.formGroup}>
                <label htmlFor="full_name" className={styles.label}>Your full name</label>
                <input
                  id="full_name"
                  name="full_name"
                  type="text"
                  placeholder="Ravi Kumar"
                  className={`${styles.input} ${errors.full_name ? styles.inputError : ""}`}
                  value={formData.full_name}
                  onChange={handleChange}
                  aria-invalid={!!errors.full_name}
                  aria-describedby={errors.full_name ? "full_name_error" : undefined}
                />
                {errors.full_name && <span id="full_name_error" className={styles.errorText}>{errors.full_name}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="institute_name" className={styles.label}>{getDynamicInstituteLabel()}</label>
                <input
                  id="institute_name"
                  name="institute_name"
                  type="text"
                  placeholder={getDynamicInstitutePlaceholder()}
                  className={`${styles.input} ${errors.institute_name ? styles.inputError : ""}`}
                  value={formData.institute_name}
                  onChange={handleChange}
                  aria-invalid={!!errors.institute_name}
                  aria-describedby={errors.institute_name ? "institute_name_error" : undefined}
                />
                {errors.institute_name && <span id="institute_name_error" className={styles.errorText}>{errors.institute_name}</span>}
                {slug && !errors.institute_name && (
                  <div className={styles.subdomainPreview}>
                    Your platform will be live at{" "}
                    <span className={styles.subdomainSlug}>{slug}.edveo.com</span>
                  </div>
                )}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="email" className={styles.label}>Work email</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="ravi@brillianceacademy.com"
                  className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
                  value={formData.email}
                  onChange={handleChange}
                  aria-invalid={!!errors.email}
                  aria-describedby={errors.email ? "email_error" : undefined}
                />
                {errors.email && <span id="email_error" className={styles.errorText}>{errors.email}</span>}
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="phone" className={styles.label}>WhatsApp number</label>
                <div className={styles.inputWrapper}>
                  <span className={styles.inputPrefix}>🇮🇳 +91</span>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    placeholder="98765 43210"
                    maxLength={10}
                    className={`${styles.input} ${styles.inputWithPrefix} ${errors.phone ? styles.inputError : ""}`}
                    value={formData.phone}
                    onChange={(e) => {
                      const val = e.target.value.replace(/\D/g, "");
                      handleChange({ ...e, target: { ...e.target, name: "phone", value: val } } as any);
                    }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone_error" : "phone_helper"}
                  />
                </div>
                {errors.phone 
                  ? <span id="phone_error" className={styles.errorText}>{errors.phone}</span>
                  : <span id="phone_helper" className={styles.helperText}>We&apos;ll send your login details here. No spam.</span>
                }
              </div>

              <div className={styles.formGroup}>
                <label htmlFor="password" className={styles.label}>Create a password</label>
                <div className={styles.inputWrapper}>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Min. 8 characters"
                    className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
                    value={formData.password}
                    onChange={handleChange}
                    style={{ paddingRight: "40px" }}
                    aria-invalid={!!errors.password}
                    aria-describedby={errors.password ? "password_error" : undefined}
                  />
                  <button
                    type="button"
                    className={styles.inputAction}
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors.password && <span id="password_error" className={styles.errorText}>{errors.password}</span>}
              </div>

              <button
                type="submit"
                className={styles.primaryButton}
                disabled={isSubmitting || isSuccess}
                aria-disabled={isSubmitting || isSuccess}
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className={styles.spinner} size={20} />
                    Setting up your account...
                  </>
                ) : isSuccess ? (
                  <>
                    <Check size={20} />
                    Account created!
                  </>
                ) : (
                  "Start my free trial →"
                )}
              </button>

              <p className={styles.footerText}>
                By continuing, you agree to Edveo&apos;s{" "}
                <Link href="/terms" className={styles.linkDark}>Terms of Service</Link>{" "}
                and{" "}
                <Link href="/privacy" className={styles.linkDark}>Privacy Policy</Link>
              </p>
            </form>
          </div>
        )}
      </main>
    </div>
  );
}
