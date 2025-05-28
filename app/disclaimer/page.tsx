import type { Metadata } from "next"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Disclaimer | Gorkhali",
  description: "Legal disclaimer for Gorkhali - Important information about using our platform",
}

export default function DisclaimerPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-black via-purple-950/20 to-black text-white">
      <div className="container mx-auto px-4 py-24 relative z-10">
        <h1 className="text-5xl md:text-6xl font-bold text-center mb-16 bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-300 to-purple-400">
          Disclaimer
        </h1>

        <div className="prose prose-lg prose-invert max-w-4xl mx-auto bg-black/40 backdrop-blur-sm p-8 rounded-xl border border-purple-500/20 shadow-2xl">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-semibold text-purple-300">1. No Financial Advice</h2>
              <p>
                The information provided on the Gorkhali website and through our services is for general informational
                purposes only. It should not be construed as professional financial advice. We are not financial
                advisors, and the content on our website should not be used as a substitute for consultation with
                qualified professionals. Before making any financial or investment decisions, we strongly recommend
                consulting with a licensed financial advisor.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">2. Investment Risks</h2>
              <p>
                Cryptocurrency and blockchain investments involve substantial risk and are not suitable for all
                investors. The value of cryptocurrencies can be highly volatile, and past performance is not indicative
                of future results. You should be prepared to lose all of your investment. Never invest money that you
                cannot afford to lose.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">3. Accuracy of Information</h2>
              <p>
                While we strive to provide accurate and up-to-date information, we make no representations or warranties
                of any kind, express or implied, about the completeness, accuracy, reliability, suitability, or
                availability of the information, products, services, or related graphics contained on our website. Any
                reliance you place on such information is strictly at your own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">4. Forward-Looking Statements</h2>
              <p>
                Our website may contain forward-looking statements that involve risks and uncertainties. Such statements
                are based on our current expectations and projections about future events and are subject to change.
                Forward-looking statements are not guarantees of future performance, and actual results may differ
                materially from those anticipated in the forward-looking statements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">5. Third-Party Links</h2>
              <p>
                Our website may contain links to third-party websites or services that are not owned or controlled by
                Gorkhali. We have no control over, and assume no responsibility for, the content, privacy policies, or
                practices of any third-party websites or services. We do not warrant the offerings of any of these
                entities/individuals or their websites.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">6. No Guarantees</h2>
              <p>
                We do not guarantee, represent, or warrant that your use of our service will be uninterrupted, timely,
                secure, or error-free. We do not warrant that the results that may be obtained from the use of the
                service will be accurate or reliable. You agree that from time to time, we may remove the service for
                indefinite periods of time or cancel the service at any time, without notice to you.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">7. Limitation of Liability</h2>
              <p>
                In no event shall Gorkhali, its directors, employees, partners, agents, suppliers, or affiliates be
                liable for any indirect, incidental, special, consequential, or punitive damages, including without
                limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Your access to or use of or inability to access or use the service</li>
                <li>Any conduct or content of any third party on the service</li>
                <li>Any content obtained from the service</li>
                <li>Unauthorized access, use, or alteration of your transmissions or content</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">8. Regulatory Compliance</h2>
              <p>
                Cryptocurrency and blockchain technologies are subject to various laws and regulations in different
                jurisdictions. It is your responsibility to ensure that your use of our services complies with all
                applicable laws and regulations in your jurisdiction. We do not represent that our content is
                appropriate or available for use in all locations.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">9. Changes to Disclaimer</h2>
              <p>
                We reserve the right to modify this disclaimer at any time. Changes and clarifications will take effect
                immediately upon their posting on the website. We encourage you to check this page periodically for any
                changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-purple-300">10. Contact Information</h2>
              <p>If you have any questions about this disclaimer, please contact us at:</p>
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
