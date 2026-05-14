import { useEffect, useMemo, useState } from 'react';

interface ImageUploadFieldProps {
  files: File[];
  onChange: (files: File[]) => void;
  maxFiles?: number;
  loading?: boolean;
}

export function ImageUploadField({
  files,
  onChange,
  maxFiles = 10,
  loading = false,
}: ImageUploadFieldProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  useEffect(() => {
    const urls = files.map((file) => URL.createObjectURL(file));
    setPreviewUrls(urls);

    return () => {
      urls.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [files]);

  const remainingSlots = useMemo(() => Math.max(maxFiles - files.length, 0), [files.length, maxFiles]);

  function mergeFiles(fileList: FileList | null) {
    if (!fileList || loading) {
      return;
    }

    const nextFiles = Array.from(fileList).filter((file) => file.type.startsWith('image/'));
    if (!nextFiles.length) {
      return;
    }

    const merged = [...files, ...nextFiles].slice(0, maxFiles);
    onChange(merged);
  }

  function removeAt(index: number) {
    const next = files.filter((_, currentIndex) => currentIndex !== index);
    onChange(next);
  }

  return (
    <div className="form-grid">
      <div
        className={`upload-dropzone ${isDragging ? 'is-dragging' : ''}`}
        onDragOver={(event) => {
          event.preventDefault();
          if (!loading) {
            setIsDragging(true);
          }
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          mergeFiles(event.dataTransfer.files);
        }}
      >
        <input
          type="file"
          accept="image/*"
          multiple
          disabled={loading || remainingSlots === 0}
          onChange={(event) => {
            mergeFiles(event.target.files);
            event.target.value = '';
          }}
        />
        <p className="upload-dropzone-title">Arraste imagens aqui ou clique para selecionar</p>
        <p className="auth-note">
          {loading
            ? 'Enviando imagens...'
            : `Voce pode enviar ate ${maxFiles} imagens (${remainingSlots} restantes).`}
        </p>
      </div>

      {files.length > 0 && (
        <div className="upload-grid">
          {files.map((file, index) => (
            <article key={`${file.name}-${index}`} className="upload-card">
              <img className="upload-preview" src={previewUrls[index]} alt={file.name} />
              <div className="upload-meta">
                <p>{file.name}</p>
                <button type="button" className="button-secondary" onClick={() => removeAt(index)}>
                  Remover
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}
