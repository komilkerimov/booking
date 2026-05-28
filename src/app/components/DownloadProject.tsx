import { archiveBase64 } from "../projectArchive";

export function DownloadProject() {
  const handleDownload = () => {
    const binary = atob(archiveBase64);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i++) {
      bytes[i] = binary.charCodeAt(i);
    }
    const blob = new Blob([bytes], { type: "application/gzip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "project.tar.gz";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: "#f5f5f5" }}>
      <div style={{ background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 4px 24px rgba(0,0,0,0.1)", textAlign: "center", maxWidth: 400 }}>
        <div style={{ fontSize: 48, marginBottom: 16 }}>📦</div>
        <h2 style={{ margin: "0 0 8px", fontSize: 22, fontWeight: 700 }}>Скачать проект</h2>
        <p style={{ color: "#666", marginBottom: 24 }}>
          Архив содержит все исходные файлы проекта (без node_modules).
        </p>
        <button
          onClick={handleDownload}
          style={{
            background: "#1a73e8",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "14px 32px",
            fontSize: 16,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Скачать project.tar.gz
        </button>
        <p style={{ color: "#999", fontSize: 13, marginTop: 16 }}>
          ~271 KB • React + Tailwind CSS
        </p>
      </div>
    </div>
  );
}
