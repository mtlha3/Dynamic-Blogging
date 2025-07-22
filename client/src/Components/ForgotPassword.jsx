import { useState } from "react"
import { Link } from "react-router-dom"
import { Loader2, Mail, Shield, Lock, ArrowRight, ArrowLeft, CheckCircle, Key } from "lucide-react"
import API from "../../api/api"

const ForgotPassword = () => {
  const [step, setStep] = useState(1)
  const [email, setEmail] = useState("")
  const [otp, setOtp] = useState("")
  const [newPassword, setNewPassword] = useState("")
  const [message, setMessage] = useState("")
  const [submitting, setSubmitting] = useState(false)

  const handleEmailSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")
    try {
      const res = await API.post("/users/forgot-password", { email })
      setMessage(res.data.message || "OTP sent to your email.")
      setStep(2)
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong.")
    } finally {
      setSubmitting(false)
    }
  }

  const handleOtpSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")
    try {
      const res = await API.post("/users/verify-otp", { email, otp })
      setMessage(res.data.message || "OTP verified successfully.")
      setStep(3)
    } catch (err) {
      setMessage(err.response?.data?.message || "Invalid OTP.")
    } finally {
      setSubmitting(false)
    }
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    setMessage("")
    try {
      const res = await API.post("/users/reset-password", {
        email,
        otp,
        password: newPassword,
      })
      setMessage(res.data.message || "Password updated successfully.")
      setTimeout(() => {
        setStep(1)
        setEmail("")
        setOtp("")
        setNewPassword("")
      }, 2000)
    } catch (err) {
      setMessage(err.response?.data?.message || "Failed to reset password.")
    } finally {
      setSubmitting(false)
    }
  }

  const getStepIcon = () => {
    switch (step) {
      case 1:
        return <Mail className="w-8 h-8 text-white" />
      case 2:
        return <Shield className="w-8 h-8 text-white" />
      case 3:
        return <Lock className="w-8 h-8 text-white" />
      default:
        return <Key className="w-8 h-8 text-white" />
    }
  }

  const getStepTitle = () => {
    switch (step) {
      case 1:
        return "Reset Password"
      case 2:
        return "Verify OTP"
      case 3:
        return "New Password"
      default:
        return "Reset Password"
    }
  }

  const getStepDescription = () => {
    switch (step) {
      case 1:
        return "Enter your email to receive a verification code"
      case 2:
        return "Enter the 6-digit code sent to your email"
      case 3:
        return "Create a new secure password"
      default:
        return "Reset your password"
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 p-4 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-violet-400/20 to-purple-600/20 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-pink-400/20 to-violet-600/20 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r from-purple-400/10 to-pink-400/10 rounded-full blur-3xl"></div>
      </div>

      <div className="w-full max-w-md relative">
        {/* Main card */}
        <div className="bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8 relative overflow-hidden">
          {/* Card decorative gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/40 to-white/20 rounded-2xl"></div>

          <div className="relative z-10">
            {/* Progress Steps */}
            <div className="flex items-center justify-center mb-8">
              <div className="flex items-center space-x-4">
                {[1, 2, 3].map((stepNumber) => (
                  <div key={stepNumber} className="flex items-center">
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                        stepNumber === step
                          ? "bg-gradient-to-br from-violet-500 to-purple-600 text-white shadow-lg"
                          : stepNumber < step
                            ? "bg-green-500 text-white"
                            : "bg-gray-200 text-gray-500"
                      }`}
                    >
                      {stepNumber < step ? <CheckCircle className="w-5 h-5" /> : stepNumber}
                    </div>
                    {stepNumber < 3 && (
                      <div
                        className={`w-8 h-0.5 transition-all duration-300 ${
                          stepNumber < step ? "bg-green-500" : "bg-gray-200"
                        }`}
                      />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Header */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-violet-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
                {getStepIcon()}
              </div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                {getStepTitle()}
              </h1>
              <p className="text-gray-600 mt-2 font-medium">{getStepDescription()}</p>
            </div>

            {/* Step 1: Email Input */}
            {step === 1 && (
              <form onSubmit={handleEmailSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="email" className="text-sm font-semibold text-gray-700 block">
                    Email Address
                  </label>
                  <div className="relative group">
                    <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                    <input
                      id="email"
                      type="email"
                      placeholder="Enter your email address"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Sending OTP...
                    </>
                  ) : (
                    <>
                      Send OTP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 2: OTP Verification */}
            {step === 2 && (
              <form onSubmit={handleOtpSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="otp" className="text-sm font-semibold text-gray-700 block">
                    Verification Code
                  </label>
                  <div className="relative group">
                    <Shield className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                    <input
                      id="otp"
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      maxLength={6}
                      className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70 text-center text-lg font-mono tracking-widest"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Check your email for the verification code</p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    <>
                      Verify OTP
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Step 3: New Password */}
            {step === 3 && (
              <form onSubmit={handlePasswordSubmit} className="space-y-6">
                <div className="space-y-2">
                  <label htmlFor="newPassword" className="text-sm font-semibold text-gray-700 block">
                    New Password
                  </label>
                  <div className="relative group">
                    <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 group-focus-within:text-violet-500 transition-colors duration-200" />
                    <input
                      id="newPassword"
                      type="password"
                      placeholder="Enter your new password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                      minLength={8}
                      className="w-full pl-11 pr-4 py-3 h-12 bg-white/50 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500 transition-all duration-200 hover:bg-white/70"
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Password must be at least 8 characters long</p>
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-400 disabled:to-gray-500 text-white font-semibold rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none focus:outline-none focus:ring-2 focus:ring-violet-500/20 flex items-center justify-center"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      Reset Password
                      <CheckCircle className="ml-2 h-5 w-5" />
                    </>
                  )}
                </button>
              </form>
            )}

            {/* Message display */}
            {message && (
              <div
                className={`mt-6 p-4 rounded-xl border transition-all duration-300 ${
                  message.includes("successfully") || message.includes("sent") || message.includes("verified")
                    ? "bg-green-50 border-green-200 text-green-800"
                    : "bg-red-50 border-red-200 text-red-800"
                }`}
              >
                <div className="flex items-center space-x-2">
                  {message.includes("successfully") || message.includes("sent") || message.includes("verified") ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <div className="w-5 h-5 bg-red-500 rounded-full flex items-center justify-center">
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  )}
                  <p className="text-sm font-medium">{message}</p>
                </div>
              </div>
            )}

            {/* Back to login link */}
            {step !== 3 && (
              <div className="text-center mt-8 pt-6 border-t border-gray-200/50">
                <p className="text-sm text-gray-600">
                  Remember your password?{" "}
                  <Link
                    to="/login"
                    className="font-semibold text-violet-600 hover:text-violet-800 hover:underline transition-colors duration-200 inline-flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-1" />
                    Back to Login
                  </Link>
                </p>
              </div>
            )}

            {/* Success redirect message */}
            {step === 3 && message.includes("successfully") && (
              <div className="text-center mt-6 p-4 bg-violet-50/50 rounded-xl border border-violet-100">
                <p className="text-sm text-violet-700">🎉 Password reset successful! Redirecting to login...</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword
