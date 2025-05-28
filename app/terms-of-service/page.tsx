import type { Metadata } from "next"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Terms of Service | Gorkhali",
  description: "Terms of Service for Gorkhali - Rules and guidelines for using our platform",
}

export default function TermsOfServicePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400">
          Terms of Service
        </h1>

        <div className="prose prose-lg prose-invert max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-2xl">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-purple-300">1. Acceptance of Terms</h2>
              <p>
                By accessing or using the Gorkhali website and services ("Services"), you agree to be bound by these
                Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our Services. These
                Terms constitute a legally binding agreement between you and Gorkhali ("we," "us," or "our").
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">2. Changes to Terms</h2>
              <p>
                We reserve the right to modify these Terms at any time. We will provide notice of significant changes by
                posting an updated version on our website. Your continued use of our Services after such changes
                constitutes your acceptance of the new Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">3. Eligibility</h2>
              <p>
                You must be at least 18 years old to use our Services. By using our Services, you represent and warrant
                that you meet all eligibility requirements. If you are using our Services on behalf of an entity, you
                represent and warrant that you have the authority to bind that entity to these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">4. User Accounts</h2>
              <p>Some features of our Services may require you to create an account. You are responsible for:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Providing accurate and complete information</li>
                <li>Maintaining the security of your account credentials</li>
                <li>All activities that occur under your account</li>
                <li>Notifying us immediately of any unauthorized use</li>
              </ul>
              <p>
                We reserve the right to suspend or terminate accounts that violate these Terms or for any other reason
                at our sole discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">5. Intellectual Property</h2>
              <p>
                All content on our website, including text, graphics, logos, icons, images, audio clips, digital
                downloads, and software, is the property of Gorkhali or its content suppliers and is protected by
                international copyright, trademark, and other intellectual property laws.
              </p>
              <p>
                We grant you a limited, non-exclusive, non-transferable, and revocable license to use our Services for
                their intended purposes. You may not:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  Modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative
                  works from, transfer, or sell any information obtained from our Services
                </li>
                <li>Use our intellectual property without our express written permission</li>
                <li>Remove any copyright, trademark, or other proprietary notices</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">6. User Content</h2>
              <p>
                You retain ownership of any content you submit, post, or display on or through our Services ("User
                Content"). By submitting User Content, you grant us a worldwide, non-exclusive, royalty-free license to
                use, reproduce, modify, adapt, publish, translate, distribute, and display such content.
              </p>
              <p>You represent and warrant that:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>You own or have the necessary rights to the User Content</li>
                <li>The User Content does not violate the rights of any third party</li>
                <li>The User Content complies with these Terms and all applicable laws</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">7. Prohibited Activities</h2>
              <p>You agree not to engage in any of the following prohibited activities:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Violating any applicable laws or regulations</li>
                <li>Infringing on the intellectual property rights of others</li>
                <li>Uploading or transmitting viruses, malware, or other malicious code</li>
                <li>Attempting to gain unauthorized access to our systems or networks</li>
                <li>Interfering with or disrupting our Services</li>
                <li>Collecting or harvesting data about other users without their consent</li>
                <li>Using our Services for any illegal or unauthorized purpose</li>
                <li>Engaging in any activity that could damage, disable, or impair our Services</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">8. Third-Party Services</h2>
              <p>
                Our Services may contain links to third-party websites or services that are not owned or controlled by
                us. We have no control over, and assume no responsibility for, the content, privacy policies, or
                practices of any third-party websites or services. You acknowledge and agree that we shall not be
                responsible or liable for any damage or loss caused by the use of such third-party websites or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">9. Disclaimer of Warranties</h2>
              <p>
                OUR SERVICES ARE PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR
                IMPLIED, INCLUDING, BUT NOT LIMITED TO, IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR
                PURPOSE, AND NON-INFRINGEMENT. WE DO NOT WARRANT THAT OUR SERVICES WILL BE UNINTERRUPTED OR ERROR-FREE,
                THAT DEFECTS WILL BE CORRECTED, OR THAT OUR SERVICES OR THE SERVERS THAT MAKE THEM AVAILABLE ARE FREE OF
                VIRUSES OR OTHER HARMFUL COMPONENTS.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">10. Limitation of Liability</h2>
              <p>
                TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL GORKHALI, ITS AFFILIATES,
                DIRECTORS, EMPLOYEES, AGENTS, OR LICENSORS BE LIABLE FOR ANY INDIRECT, PUNITIVE, INCIDENTAL, SPECIAL,
                CONSEQUENTIAL, OR EXEMPLARY DAMAGES, INCLUDING WITHOUT LIMITATION DAMAGES FOR LOSS OF PROFITS, GOODWILL,
                USE, DATA, OR OTHER INTANGIBLE LOSSES, ARISING OUT OF OR RELATING TO THE USE OF, OR INABILITY TO USE,
                OUR SERVICES.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">11. Indemnification</h2>
              <p>
                You agree to defend, indemnify, and hold harmless Gorkhali, its affiliates, licensors, and service
                providers, and its and their respective officers, directors, employees, contractors, agents, licensors,
                suppliers, successors, and assigns from and against any claims, liabilities, damages, judgments, awards,
                losses, costs, expenses, or fees (including reasonable attorneys' fees) arising out of or relating to
                your violation of these Terms or your use of our Services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">12. Governing Law</h2>
              <p>
                These Terms shall be governed by and construed in accordance with the laws of [Jurisdiction], without
                regard to its conflict of law provisions. Any legal action or proceeding arising out of or relating to
                these Terms shall be exclusively brought in the courts of [Jurisdiction], and you consent to the
                personal jurisdiction of such courts.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">13. Termination</h2>
              <p>
                We may terminate or suspend your access to our Services immediately, without prior notice or liability,
                for any reason whatsoever, including without limitation if you breach these Terms. Upon termination,
                your right to use our Services will immediately cease.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">14. Severability</h2>
              <p>
                If any provision of these Terms is held to be invalid or unenforceable, such provision shall be struck
                and the remaining provisions shall be enforced to the fullest extent under law.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">15. Contact Information</h2>
              <p>If you have any questions about these Terms, please contact us at:</p>
              <div className="mt-2">
                <p>
                  <strong>Email:</strong> legal@gorkhali.com
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
