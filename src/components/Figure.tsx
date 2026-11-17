import Image, { getImageProps, type StaticImageData } from 'next/image';
import { pad } from '@/content/projects';

type Props = {
  src: StaticImageData;
  caption: string;
  n: number;
  total: number;
  sizes?: string;
  className?: string;
  eager?: boolean;
  delay?: number;
};

/** Captioned, numbered figure that opens in the site lightbox. */
export default function Figure({ src, caption, n, total, sizes = '(max-width: 900px) 100vw, 80vw', className, eager, delay = 0 }: Props) {
  const full = getImageProps({ src, alt: caption, width: Math.min(src.width, 2560), quality: 86 }).props.src;
  return (
    <figure className={`fig ${className ?? ''}`}>
      <button type="button" className="fig-zoom" data-zoom={full} data-caption={caption} aria-label={`Enlarge: ${caption}`}>
        <span className="fig-media" data-wipe style={{ '--delay': `${delay}ms` } as React.CSSProperties}>
          <Image src={src} alt={caption} sizes={sizes} priority={eager} />
        </span>
      </button>
      <figcaption>
        <span className="boxed">{pad(n)} / {pad(total)}</span> <span>{caption}</span>
      </figcaption>
    </figure>
  );
}
