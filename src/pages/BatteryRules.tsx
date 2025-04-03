import React from "react";
import PdfCard from "../components/PdfCard";
import { useDocuments } from "../context/DocumentContext";
import { Battery } from "lucide-react";
import { fadeIn, slideInFromBottom, slideInFromLeft, slideInFromRight, slideInFromTop, staggeredChildren } from "../lib/animations";

const BatteryRules: React.FC = () => {
  const { documents } = useDocuments();
  const batteryDocuments = documents.filter((doc) => doc.category === "battery");
  const getStaggered = staggeredChildren(fadeIn, 100, 100);

  return (
    <div className="min-h-screen flex flex-col">
      <div className="flex-grow bg-gray-50 dark:bg-eco-green-medium/10">
        <div className="eco-container">
          <div className={`flex items-center mb-8 ${slideInFromTop}`}>
            <Battery className="h-10 w-10 mr-3 text-eco-blue-dark dark:text-eco-blue-light animate-pulse" />
            <h1 className="page-title">Battery Rules and Regulations</h1>
          </div>
          
          <div className={`mb-8 ${fadeIn}`}>
            <h2 className="text-2xl font-bold text-eco-green-dark dark:text-white mb-4">
              BATTERIES (MANAGEMENT AND HANDLING) RULES 2010
            </h2>
            <p className="text-gray-700 dark:text-gray-200 mb-4">
              The Batteries (Management & Handling) Rules, 2001 was notified by Ministry of Environment and Forest, 
              Government of India on May 16th, 2001. During the year 2010 on 4th May, the said Rules is amended and 
              called as; the Batteries (Management & Handling) Amendment Rules, 2010. These Rules shall apply to every 
              Manufacturer, Importer, Dealer, Recycler, Auctioneer and Bulk consumers involved in manufacture, processing, 
              sale, purchase import and use of batteries or components thereof.
            </p>
          </div>

          <div className={`bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8 ${slideInFromLeft} hover:shadow-lg transition-all duration-300`}>
            <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-4">
              Status of Units Identified in Karnataka
            </h3>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white dark:bg-eco-green-dark rounded-lg">
                <thead>
                  <tr className="bg-eco-green-medium/10 dark:bg-eco-green-medium/20">
                    <th className="px-4 py-2 text-left text-eco-green-dark dark:text-white">Sl.No</th>
                    <th className="px-4 py-2 text-left text-eco-green-dark dark:text-white">Particulars Units</th>
                    <th className="px-4 py-2 text-left text-eco-green-dark dark:text-white">No of Units</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">1</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Manufacturers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">25</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">2</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Importers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">59</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">3</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Dealers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">255</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">4</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Recyclers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">23</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">5</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Auctioneers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">17</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-eco-green-medium/20">
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">6</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">Bulk consumers</td>
                    <td className="px-4 py-2 text-gray-700 dark:text-gray-200">266</td>
                  </tr>
                  <tr className="bg-eco-green-medium/10 dark:bg-eco-green-medium/20 font-bold">
                    <td className="px-4 py-2 text-eco-green-dark dark:text-white" colSpan={2}>Total</td>
                    <td className="px-4 py-2 text-eco-green-dark dark:text-white">645</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className={`bg-white dark:bg-eco-green-dark rounded-lg shadow-sm p-6 mb-8 ${slideInFromRight} hover:shadow-lg transition-all duration-300`}>
            <h3 className="text-lg font-medium text-eco-blue-dark dark:text-eco-blue-light mb-4">
              Steps taken by the Board for effective implementation
            </h3>
            <ol className="space-y-3 list-decimal list-inside text-gray-700 dark:text-gray-200">
              <li>A letter dated: 06.06.2012 has been addressed to 58 importers to submit half yearly returns to the Board under the Batteries (Management & Handling) Amendment Rules, 2010.</li>
              <li>A letter dated: 06.06.2012 has been addressed to 25 manufacturers to submit half yearly returns to the Board under the Batteries (Management & Handling) Amendment Rules, 2010.</li>
              <li>A letter dated: 06.06.2012 has been addressed to 25 recyclers to submit half yearly returns to the Board under the Batteries (Management & Handling) Amendment Rules, 2010.</li>
              <li>A letter dated: 18.06.2012 has been addressed to 305 dealers to submit half yearly returns to the Board under the Batteries (Management & Handling) Amendment Rules, 2010.</li>
              <li>A letter dated: 22.03.2013 has been addressed to 13 Joint Commissioners (Admin) of Commercial Tax Departments in Karnataka, requesting them to provide list of Battery Dealers who have registered under VAT, so as to pursue them to comply with the Batteries (Management & Handling) Amendment Rules, 2010.</li>
            </ol>
          </div>
          
          <h2 className={`section-title ${slideInFromTop}`}>Battery Regulations Documents</h2>
          {batteryDocuments.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {batteryDocuments.map((doc, index) => (
                <div key={doc.id} className={getStaggered(index)}>
                  <PdfCard document={doc} />
                </div>
              ))}
            </div>
          ) : (
            <div className={`text-center py-12 ${fadeIn}`}>
              <p className="text-gray-500 dark:text-gray-400">
                No battery regulation documents available yet.
              </p>
            </div>
          )}
        </div>
      </div>
      
      <footer className={`${slideInFromBottom} bg-eco-green-dark text-white py-6`}>
        <div className="container mx-auto px-4 text-center">
          <p>&copy; {new Date().getFullYear()} Eco-Doc Hub. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default BatteryRules;
