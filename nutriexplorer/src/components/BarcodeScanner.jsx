import { Html5Qrcode } from "html5-qrcode";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function BarcodeScanner() {
  const navigate = useNavigate();
  const [isScanning, setIsScanning] = useState(false);
  const html5QrCodeRef = useRef(null);

  const startScanning = async () => {
    if (isScanning || html5QrCodeRef.current) return;

    const scanner = new Html5Qrcode("scanner");
    html5QrCodeRef.current = scanner;

    try {
      await scanner.start(
        { facingMode: "environment" },
        { fps: 10, qrbox: 250 },
        (decodedText) => {
          stopScanning();
          navigate(`/product/${decodedText}`);
        },
        (errorMessage) => {
          console.warn("Scan error:", errorMessage);
        }
      );
      setIsScanning(true);
    } catch (err) {
      console.error("Camera start error:", err);
      alert("Could not start the camera. Please allow access.");
      html5QrCodeRef.current = null;
    }
  };

  const stopScanning = async () => {
    if (html5QrCodeRef.current) {
      try {
        await html5QrCodeRef.current.stop();
        await html5QrCodeRef.current.clear();
      } catch (err) {
        console.warn("Error stopping scanner:", err);
      } finally {
        html5QrCodeRef.current = null;
        setIsScanning(false);
      }
    }
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const tempScanner = new Html5Qrcode("file-upload-scanner");
    try {
      const result = await tempScanner.scanFile(file, true);
      navigate(`/product/${result}`);
    } catch (err) {
      alert("Failed to scan image.");
      console.error("File scan error", err);
    } finally {
      await tempScanner.clear();
    }
  };

  useEffect(() => {
    return () => {
      stopScanning();
    };
  }, []);

  return (
    <div className="min-h-screen px-4 py-8 flex flex-col items-center justify-start dark:bg-gray-900 bg-white dark:text-emerald-400 text-blue-700">
      <Link
        to="/"
        className="hover:underline mb-6 inline-block text-lg text-center mx-auto"
      >
        ← Back to Home
      </Link>
      <h1 className="text-2xl font-bold mb-4">Scan a Barcode</h1>

      {!isScanning ? (
        <button
          onClick={startScanning}
          className="mb-6 bg-blue-600 dark:bg-emerald-500 text-white hover:bg-blue-700 dark:hover:bg-emerald-600 px-4 py-2 rounded"
        >
          Start Scanning
        </button>
      ) : (
        <button
          onClick={stopScanning}
          className="mb-6 bg-blue-600 dark:bg-emerald-500 text-white hover:bg-blue-700 dark:hover:bg-emerald-600 px-4 py-2 rounded"
        >
          Stop Scanning
        </button>
      )}

      <div
        id="scanner"
        className="w-full max-w-xs min-h-[280px] border rounded mb-8"
      />

      <div className="w-full max-w-sm">
        <label className="block mb-2 text-sm font-medium">
          Or upload a barcode image:
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="block w-full text-sm text-gray-700 file:mr-4 file:py-2 file:px-4 file:border file:rounded file:text-sm file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
        />
        <div id="file-upload-scanner" className="hidden" />
      </div>
    </div>
  );
}

export default BarcodeScanner;
