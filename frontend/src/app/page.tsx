"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";

const DEPARTMENTS = [
  { id: "trading_educator", label: "Trading Educator" },
  { id: "education_resource", label: "Education Resource Team" },
  { id: "social_media", label: "Social Media Management" },
  { id: "editing", label: "Editing" },
  { id: "contact_support", label: "Contact Support Team" },
];

interface FormData {
  fullName: string;
  age: string;
  gender: string;
  mobileNumber: string;
  telegramUsername: string;
  whatsappNumber: string;
  emailAddress: string;
  location: string;
  tradingTools: string;
  specificSkills: string;
  previousExperience: string;
  workExperience: string;
  tradingKnowledge: string;
  editingSkills: string;
  socialMediaExperience: string;
  department: string;
  hoursPerDay: string;
  availableDays: string;
  hasLaptop: boolean;
  hasHighSpeedInternet: boolean;
  canWorkRemote: boolean;
  sixMonthGoal: string;
  whyJoin: string;
  portfolioUrl: string;
  instagramProfile: string;
  telegramLink: string;
  discordUsername: string;
  youtubeChannel: string;
  previousWorkLinks: string;
  seriousCommitment: boolean;
  agreedToTerms: boolean;
  informationCorrect: boolean;
  understoodPhotoRequirement: boolean;
  agreedToPhoto: boolean;
}

export default function Home() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    // Section 1
    fullName: "", age: "", gender: "", mobileNumber: "", telegramUsername: "", whatsappNumber: "", emailAddress: "", location: "",
    // Section 2
    tradingTools: "", specificSkills: "", previousExperience: "", workExperience: "", tradingKnowledge: "", editingSkills: "", socialMediaExperience: "",
    // Section 3
    department: "",
    // Section 4
    hoursPerDay: "", availableDays: "", hasLaptop: false, hasHighSpeedInternet: false, canWorkRemote: false,
    // Section 5
    sixMonthGoal: "", whyJoin: "",
    // Section 6
    portfolioUrl: "", instagramProfile: "", telegramLink: "", discordUsername: "", youtubeChannel: "", previousWorkLinks: "",
    // Section 7
    seriousCommitment: false, agreedToTerms: false, informationCorrect: false, understoodPhotoRequirement: false, agreedToPhoto: false,
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const target = e.target as HTMLInputElement;
    const { name, value, type } = target;
    const checked = target.checked;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Send to backend (adjust URL to where backend runs, default 5000 in dev)
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";
      const response = await fetch(`${apiUrl}/api/applications/apply`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          age: parseInt(formData.age || "0"),
          hoursPerDay: parseInt(formData.hoursPerDay || "0")
        }),
      });

      if (response.ok) {
        setIsSuccess(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        const errorData = await response.json();
        alert("Error submitting application: " + JSON.stringify(errorData.errors || errorData));
      }
    } catch (error) {
      alert("Failed to connect to the server. Make sure the backend is running.");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen py-16 px-4 sm:px-6 lg:px-8 relative z-10">
      
      {/* SUCCESS MODAL OVERLAY */}
      <AnimatePresence>
        {isSuccess && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#111] border border-accent rounded-xl p-8 max-w-md text-center shadow-glow-lg"
            >
              <div className="w-16 h-16 bg-accent/20 text-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="text-2xl font-bold text-white mb-2">Application Received</h2>
              <p className="text-secondary-text mb-6">Thank you for applying to Market Vision. Our team will review your application and get back to you shortly.</p>
              <button 
                onClick={() => window.location.reload()}
                className="bg-accent text-black font-bold py-3 px-8 rounded-full hover:shadow-glow transition-all"
              >
                Return to Home
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-[800px] mx-auto">
        
        {/* HEADER */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold text-white mb-6 tracking-tight">
            Market Vision
          </h1>
          <div className="h-1 w-24 bg-accent mx-auto rounded-full mb-8 shadow-glow"></div>
          <p className="text-lg md:text-xl text-secondary-text max-w-2xl mx-auto italic">
            &quot;Market Vision is building a focused team of individuals who are serious about growth, skills, and financial development.&quot;
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* SECTION 1: BASIC INFO */}
          <SectionCard number={1} title="Basic Information">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Full Name" name="fullName" value={formData.fullName} onChange={handleChange} required />
              <InputField label="Age" name="age" type="number" value={formData.age} onChange={handleChange} required />
              <div className="space-y-2">
                <label className="text-sm text-secondary-text font-medium">Gender</label>
                <select name="gender" value={formData.gender} onChange={handleChange} required
                  className="w-full bg-[#111] border border-border rounded-lg px-4 py-3 text-white focus:border-accent focus:shadow-glow transition-all appearance-none">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <InputField label="Location (City/Country)" name="location" value={formData.location} onChange={handleChange} required />
              <InputField label="Email Address" name="emailAddress" type="email" value={formData.emailAddress} onChange={handleChange} required />
              <InputField label="Mobile Number" name="mobileNumber" type="tel" value={formData.mobileNumber} onChange={handleChange} required />
              <InputField label="WhatsApp Number" name="whatsappNumber" type="tel" value={formData.whatsappNumber} onChange={handleChange} required />
              <InputField label="Telegram Username" name="telegramUsername" value={formData.telegramUsername} onChange={handleChange} required />

            </div>
          </SectionCard>

          {/* SECTION 2: SKILLS & EXPERIENCE */}
          <SectionCard number={2} title="Skills & Experience">
            <div className="space-y-6">
              <TextAreaField label="What tools or platforms do you use, and how do you use them?" name="tradingTools" value={formData.tradingTools} onChange={handleChange} required />
              <TextAreaField label="Specific Skills" name="specificSkills" value={formData.specificSkills} onChange={handleChange} required />
              <TextAreaField label="Previous Experience" name="previousExperience" value={formData.previousExperience} onChange={handleChange} required />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <TextAreaField label="Work Experience (Optional)" name="workExperience" value={formData.workExperience} onChange={handleChange} />
                 <TextAreaField label="Trading Knowledge (Optional)" name="tradingKnowledge" value={formData.tradingKnowledge} onChange={handleChange} />
                 <TextAreaField label="Editing/Technical Skills (Optional)" name="editingSkills" value={formData.editingSkills} onChange={handleChange} />
                 <TextAreaField label="Social Media Experience (Optional)" name="socialMediaExperience" value={formData.socialMediaExperience} onChange={handleChange} />
              </div>
            </div>
          </SectionCard>

          {/* SECTION 3: DEPARTMENT */}
          <SectionCard number={3} title="Department Selection">
            <p className="text-sm text-secondary-text mb-4">Select the department you are applying for:</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {DEPARTMENTS.map((dept) => (
                <label
                  key={dept.id}
                  className={`cursor-pointer p-4 rounded-xl border transition-all duration-300 flex items-center gap-3 ${
                    formData.department === dept.id 
                    ? 'border-accent bg-accent/10 shadow-glow' 
                    : 'border-border bg-[#111] hover:border-accent/50'
                  }`}
                >
                  <input
                    type="radio"
                    name="department"
                    value={dept.id}
                    checked={formData.department === dept.id}
                    onChange={handleChange}
                    required
                    className="sr-only"
                  />
                  <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${formData.department === dept.id ? 'border-accent' : 'border-secondary-text'}`}>
                    {formData.department === dept.id && <div className="w-2.5 h-2.5 bg-accent rounded-full" />}
                  </div>
                  <span className="text-white font-medium">{dept.label}</span>
                </label>
              ))}
            </div>
          </SectionCard>

          {/* SECTION 4: COMMITMENT */}
          <SectionCard number={4} title="Commitment">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <InputField label="Dedicated working hours per day" name="hoursPerDay" type="number" value={formData.hoursPerDay} onChange={handleChange} required />
              <InputField label="Available working days (e.g., Mon-Fri)" name="availableDays" value={formData.availableDays} onChange={handleChange} required />
            </div>
            <div className="space-y-4 bg-[#111] p-6 rounded-xl border border-border">
              <Checkbox label="I have a personal laptop available for work" name="hasLaptop" checked={formData.hasLaptop} onChange={handleChange} />
              <Checkbox label="I have a high-speed internet connection" name="hasHighSpeedInternet" checked={formData.hasHighSpeedInternet} onChange={handleChange} />
              <Checkbox label="I am available for remote work" name="canWorkRemote" checked={formData.canWorkRemote} onChange={handleChange} />
            </div>
          </SectionCard>

          {/* SECTION 5: MINDSET */}
          <SectionCard number={5} title="Mindset">
            <div className="space-y-6">
              <TextAreaField label="Where do you see yourself in 6 months?" name="sixMonthGoal" value={formData.sixMonthGoal} onChange={handleChange} rows={4} required />
              <TextAreaField label="Why do you want to join Market Vision?" name="whyJoin" value={formData.whyJoin} onChange={handleChange} rows={4} required />
            </div>
          </SectionCard>

          {/* SECTION 6: PORTFOLIO & LINKS */}
          <SectionCard number={6} title="Portfolio & Links">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <InputField label="Portfolio URL" name="portfolioUrl" value={formData.portfolioUrl} onChange={handleChange} />
              <InputField label="Instagram Profile" name="instagramProfile" value={formData.instagramProfile} onChange={handleChange} />
              <InputField label="Telegram Link" name="telegramLink" value={formData.telegramLink} onChange={handleChange} />
              <InputField label="Discord Username" name="discordUsername" value={formData.discordUsername} onChange={handleChange} />
              <InputField label="YouTube Channel" name="youtubeChannel" value={formData.youtubeChannel} onChange={handleChange} />
              <InputField label="Previous Work Links" name="previousWorkLinks" value={formData.previousWorkLinks} onChange={handleChange} />
            </div>
          </SectionCard>

          {/* SECTION 7: FINAL AGREEMENT */}
          <SectionCard number={7} title="Final Agreement">
            <div className="space-y-4 mb-8">
              <Checkbox label="I understand this is a serious commitment." name="seriousCommitment" checked={formData.seriousCommitment} onChange={handleChange} required />
              <Checkbox 
                label={
                  <span>
                    I agree to the <button type="button" onClick={() => setShowTerms(true)} className="text-accent hover:underline">Terms and Conditions</button>.
                  </span>
                } 
                name="agreedToTerms" 
                checked={formData.agreedToTerms} 
                onChange={handleChange} 
                required 
              />
              <Checkbox label="I confirm all provided information is correct." name="informationCorrect" checked={formData.informationCorrect} onChange={handleChange} required />
              <Checkbox label="I understand that submitting a clear profile photo is required as part of the application process." name="understoodPhotoRequirement" checked={formData.understoodPhotoRequirement} onChange={handleChange} required />
              <Checkbox label="I agree to provide a clear profile photo as part of the application process." name="agreedToPhoto" checked={formData.agreedToPhoto} onChange={handleChange} required />
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              disabled={isSubmitting}
              type="submit"
              className={`w-full py-4 rounded-full font-bold text-lg transition-all duration-300 ${
                isSubmitting 
                ? 'bg-accent/50 cursor-not-allowed text-black' 
                : 'bg-accent text-black hover:shadow-glow-lg'
              }`}
            >
              {isSubmitting ? "SUBMITTING..." : "SUBMIT APPLICATION"}
            </motion.button>
          </SectionCard>

        </form>
      </div>
      {/* TERMS AND CONDITIONS MODAL */}
      <AnimatePresence>
        {showTerms && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
          >
            <motion.div 
              initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }}
              className="bg-[#111] border border-accent rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto shadow-glow-lg relative"
            >
              <button 
                onClick={() => setShowTerms(false)}
                className="absolute top-4 right-4 text-secondary-text hover:text-white"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              
              <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-3">
                <div className="w-2 h-8 bg-accent"></div>
                Terms and Conditions
              </h2>
              
              <div className="space-y-6 text-secondary-text leading-relaxed">
                <section>
                  <h3 className="text-white font-semibold mb-2">1. Introduction</h3>
                  <p>Welcome to Market Vision. By applying to join our team, you agree to comply with and be bound by the following terms and conditions of participation and professional conduct.</p>
                </section>
                
                <section>
                  <h3 className="text-white font-semibold mb-2">2. Commitment & Reliability</h3>
                  <p>Market Vision operates as a high-performance environment. Members are expected to dedicate the hours specified in their application and maintain consistent communication. Failure to meet commitments may result in removal from the team.</p>
                </section>
                
                <section>
                  <h3 className="text-white font-semibold mb-2">3. Confidentiality</h3>
                  <p>All internal strategies, tools, and proprietary information shared within Market Vision are strictly confidential. Sharing, leaking, or using this information outside the organization without explicit permission is prohibited.</p>
                </section>
                
                <section>
                  <h3 className="text-white font-semibold mb-2">4. Professionalism</h3>
                  <p>We maintain a zero-tolerance policy for harassment, discrimination, or unprofessional behavior. Every member is expected to contribute positively to the team culture and respect all colleagues.</p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">5. Data Privacy</h3>
                  <p>The information provided in this application will be used solely for the purpose of recruitment and team management. We respect your privacy and will not share your personal data with third parties without consent.</p>
                </section>

                <section>
                  <h3 className="text-white font-semibold mb-2">6. Profile Photo Requirement</h3>
                  <p>As part of the application process, all applicants are required to provide a clear profile photo. By agreeing to these terms, you confirm your willingness to submit a clear, professional-quality photo for identification and team records. Failure to provide a suitable photo may result in your application being delayed or rejected.</p>
                </section>
              </div>
              
              <div className="mt-8 pt-6 border-t border-border flex justify-end">
                <button 
                  onClick={() => setShowTerms(false)}
                  className="bg-accent text-black font-bold py-2 px-8 rounded-full hover:shadow-glow transition-all"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}

// Reusable Components

interface SectionCardProps {
  number: number;
  title: string;
  children: React.ReactNode;
}

function SectionCard({ number, title, children }: SectionCardProps) {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      className="bg-[#111111]/80 backdrop-blur-md border border-border rounded-xl p-6 md:p-8 shadow-xl"
    >
      <div className="flex items-center gap-4 mb-8 pb-4 border-b border-border">
        <div className="w-4 h-4 bg-accent"></div>
        <h2 className="text-2xl font-bold text-white tracking-wide">
          {number}. {title}
        </h2>
      </div>
      {children}
    </motion.section>
  );
}

interface InputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function InputField({ label, name, type = "text", value, onChange, required = false }: InputFieldProps) {
  return (
    <div className="space-y-2 flex-1">
      <label className="text-sm text-secondary-text font-medium">{label} {required && <span className="text-accent">*</span>}</label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full bg-[#111] border border-border rounded-lg px-4 py-3 text-white focus:border-accent focus:shadow-glow transition-all"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

interface TextAreaFieldProps {
  label: string;
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  rows?: number;
  required?: boolean;
}

function TextAreaField({ label, name, value, onChange, rows = 3, required = false }: TextAreaFieldProps) {
  return (
    <div className="space-y-2">
      <label className="text-sm text-secondary-text font-medium">{label} {required && <span className="text-accent">*</span>}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        rows={rows}
        className="w-full bg-[#111] border border-border rounded-lg px-4 py-3 text-white focus:border-accent focus:shadow-glow transition-all resize-y"
        placeholder={`Enter ${label.toLowerCase()}`}
      />
    </div>
  );
}

interface CheckboxProps {
  label: React.ReactNode;
  name: string;
  checked: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
}

function Checkbox({ label, name, checked, onChange, required = false }: CheckboxProps) {
  return (
    <label className="flex items-start gap-4 cursor-pointer group">
      <div className="relative flex items-center justify-center mt-1">
        <input
          type="checkbox"
          name={name}
          checked={checked}
          onChange={onChange}
          required={required}
          className="peer appearance-none w-5 h-5 border-2 border-secondary-text rounded transition-all checked:border-accent checked:bg-accent focus:shadow-glow"
        />
        <svg
          className="absolute w-3 h-3 text-black opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
          fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
        </svg>
      </div>
      <span className="text-secondary-text group-hover:text-white transition-colors">{label} {required && <span className="text-accent">*</span>}</span>
    </label>
  );
}
