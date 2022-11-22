import heroPlaceholder from '../../../../assets/placeholders/hero-placeholder.jpg'
import Image from 'next/image'

const HeroSection = () => {
    return (
        <div className={heroStyles.heroWrapper}>
            <div className={heroStyles.imageWrapper}>
                <Image
                    src={heroPlaceholder}
                    alt='opbrazek'
                    layout="fill"
                    objectFit="cover"
                    objectPosition="center"
                />
            </div>
            <div className={heroStyles.heroContent}>
                <h1>Hero Image</h1>
                <p>Next.js hero image example.</p>
            </div>
        </div>
    )
}

export default HeroSection

const heroStyles = {
    heroWrapper: 'relative w-full height-[50vh] mb-12',
    imageWrapper: 'z-[-1]',
    heroContent: 'relative flex flex-col items-center h-[20vh]'
} as const 
