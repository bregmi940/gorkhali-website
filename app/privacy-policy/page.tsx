import type { Metadata } from "next"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy Policy | Gorkhali",
  description: "Privacy Policy for Gorkhali - How we handle and protect your data",
}

export default function PrivacyPolicyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400">
          Privacy Policy
        </h1>

        <div className="prose prose-lg prose-invert max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-2xl">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-purple-300">1. Introduction</h2>
              <p>
                This Privacy Policy explains how Gorkhali ("we," "us," or "our") collects, uses, shares, and protects
                your personal information when you visit our website or use our services. We respect your privacy and
                are committed to protecting your personal data in compliance with applicable privacy laws worldwide,
                including the General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">2. Information We Collect</h2>
              <p>We may collect the following types of information:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Personal Information:</strong> Name, email address, wallet address, and other contact details
                  you provide.
                </li>
                <li>
                  <strong>Technical Data:</strong> IP address, browser type, device information, cookies, and usage
                  data.
                </li>
                <li>
                  <strong>Transaction Data:</strong> Details about transactions you make through our platform.
                </li>
                <li>
                  <strong>Communication Data:</strong> Preferences for receiving communications and feedback you
                  provide.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">3. How We Use Your Information</h2>
              <p>We use your information for the following purposes:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>To provide and maintain our services</li>
                <li>To process transactions and send related information</li>
                <li>To respond to your inquiries and provide customer support</li>
                <li>To send administrative information and updates</li>
                <li>To personalize your experience and deliver content relevant to your interests</li>
                <li>To improve our website and services</li>
                <li>To protect against fraudulent or unauthorized transactions</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">4. Legal Basis for Processing</h2>
              <p>We process your personal data based on one or more of the following legal grounds:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your consent</li>
                <li>Performance of a contract with you</li>
                <li>Compliance with legal obligations</li>
                <li>Our legitimate interests (which do not override your fundamental rights)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">5. Data Sharing and Third Parties</h2>
              <p>We may share your information with:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Service providers who perform services on our behalf</li>
                <li>Business partners with your consent</li>
                <li>Legal authorities when required by law</li>
                <li>In connection with a business transaction (merger, acquisition, etc.)</li>
              </ul>
              <p>We do not sell your personal information to third parties.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">6. International Transfers</h2>
              <p>
                Your information may be transferred to and processed in countries other than your country of residence.
                We implement appropriate safeguards to ensure your data is protected in accordance with this Privacy
                Policy and applicable law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">7. Your Rights</h2>
              <p>Depending on your location, you may have the following rights regarding your personal data:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Right to access your personal data</li>
                <li>Right to rectify inaccurate data</li>
                <li>Right to erasure ("right to be forgotten")</li>
                <li>Right to restrict processing</li>
                <li>Right to data portability</li>
                <li>Right to object to processing</li>
                <li>Right to withdraw consent</li>
                <li>Right to lodge a complaint with a supervisory authority</li>
              </ul>
              <p>
                To exercise these rights, please contact us using the information provided in the "Contact Us" section.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">8. Data Security</h2>
              <p>
                We implement appropriate technical and organizational measures to protect your personal data against
                unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the
                Internet or electronic storage is 100% secure, so we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">9. Data Retention</h2>
              <p>
                We retain your personal data only for as long as necessary to fulfill the purposes for which it was
                collected, including legal, accounting, or reporting requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">10. Children's Privacy</h2>
              <p>
                Our services are not intended for individuals under the age of 18. We do not knowingly collect personal
                information from children. If you are a parent or guardian and believe your child has provided us with
                personal information, please contact us.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">11. Cookies and Tracking Technologies</h2>
              <p>
                We use cookies and similar tracking technologies to enhance your experience on our website. You can set
                your browser to refuse all or some browser cookies or to alert you when websites set or access cookies.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">12. Changes to This Privacy Policy</h2>
              <p>
                We may update this Privacy Policy from time to time. We will notify you of any changes by posting the
                new Privacy Policy on this page and updating the "Last Updated" date. You are advised to review this
                Privacy Policy periodically for any changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">13. Contact Us</h2>
              <p>If you have any questions about this Privacy Policy or our data practices, please contact us at:</p>
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> privacy@gorkhali.com
                </p>
                <p>
                  <strong>Address:</strong> Gorkhali Headquarters, Digital Kingdom Avenue, Blockchain City
                </p>
              </div>
            </section>

            <div className="text-sm text-gray-400 mt-8">Last Updated: May 22, 2025</div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  )
}
