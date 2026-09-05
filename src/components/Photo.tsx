import Image from "next/image";

export type PhotoRatio = "4/3" | "3/2" | "4/5" | "1/1" | "16/9";

type PhotoProps = {
  /** /public からの相対パス。null なら「紙のプレースホルダー」を描画する */
  src?: string | null;
  alt: string;
  ratio: PhotoRatio;
  /** 未撮影のとき、撮影予定の内容を書く。プレースホルダーを撮影リストとして機能させる */
  plan?: string;
  priority?: boolean;
  sizes?: string;
  className?: string;
  /** 犬の顔は上寄りに来ることが多いので既定は 50% 40% */
  objectPosition?: string;
  rounded?: boolean;
};

/**
 * 写真の枠。src が無い期間もレイアウトシフトを起こさないために、
 * 比率だけは本番と同一で描画する（§7.4）。
 */
export function Photo({
  src,
  alt,
  ratio,
  plan,
  priority = false,
  sizes = "100vw",
  className = "",
  objectPosition = "50% 40%",
  rounded = true,
}: PhotoProps) {
  const radius = rounded ? "rounded-[var(--radius-md)]" : "";

  if (!src) {
    return (
      <div
        style={{ aspectRatio: ratio }}
        className={`relative flex flex-col items-center justify-center gap-2 overflow-hidden bg-well px-4 text-center ring-1 ring-inset ring-line ${radius} ${className}`}
      >
        <span className="type-overline-en text-ink-muted">Photo</span>
        {plan ? <span className="type-caption max-w-[24ch] text-ink-muted">{plan}</span> : null}
        <span className="sr-only">{alt}</span>
      </div>
    );
  }

  return (
    <div style={{ aspectRatio: ratio }} className={`relative overflow-hidden bg-well ${radius} ${className}`}>
      <Image
        src={src}
        alt={alt}
        fill
        sizes={sizes}
        priority={priority}
        fetchPriority={priority ? "high" : "auto"}
        decoding="async"
        quality={80}
        style={{ objectFit: "cover", objectPosition }}
      />
    </div>
  );
}
