import Image from "next/image";

export default function Rating({
    rating
}: {
    rating: number
}) {
    return (
        <div className="grid grid-cols-[auto_1fr] gap-1 items-center my-2">
            <Image
                className="inline w-8 h-8"
                src="/icons/star.svg"
                alt="star icon"
                width={40}
                height={40}
                priority
            />
            <p className="inline-block justify-self-start h-8 leading-8">
                {parseFloat(rating.toString()).toFixed(1) + " / 10"}
            </p>
        </div>
    );
}