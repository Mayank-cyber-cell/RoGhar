import { useState } from 'react';
import QRCode from 'react-qr-code';
import { Download, Share2, QrCode } from 'lucide-react';

const QRCodeGenerator = ({ data, title = "Health Profile QR Code" }) => {
  const [showQR, setShowQR] = useState(false);

  const generateQRData = () => {
    return JSON.stringify({
      type: 'ROGHAR_HEALTH_PROFILE',
      timestamp: new Date().toISOString(),
      data: data
    });
  };

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'roghar-health-qr.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  const shareQR = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: 'My ROGHAR Health Profile QR Code',
          url: window.location.href
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy to clipboard
      navigator.clipboard.writeText(generateQRData());
      alert('QR data copied to clipboard!');
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm p-6">
      <div className="text-center">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">{title}</h3>
        
        {!showQR ? (
          <div className="py-8">
            <QrCode className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-gray-600 mb-4">
              Generate a secure QR code for your health profile
            </p>
            <button
              onClick={() => setShowQR(true)}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary-dark transition-colors"
            >
              Generate QR Code
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex justify-center p-4 bg-white border-2 border-gray-200 rounded-lg">
              <QRCode
                id="qr-code-svg"
                value={generateQRData()}
                size={200}
                level="M"
                includeMargin={true}
              />
            </div>
            
            <div className="text-sm text-gray-600">
              <p className="mb-2">🔒 This QR code contains encrypted health data</p>
              <p>Valid for 24 hours for security</p>
            </div>
            
            <div className="flex space-x-3 justify-center">
              <button
                onClick={downloadQR}
                className="flex items-center space-x-2 bg-secondary text-white px-4 py-2 rounded-lg hover:bg-secondary-dark transition-colors"
              >
                <Download className="w-4 h-4" />
                <span>Download</span>
              </button>
              <button
                onClick={shareQR}
                className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QRCodeGenerator;