'use client';
import Eclip from '@/assets/images/eclip.svg';
import F404 from '@/assets/images/404.svg';
import Image from 'next/image';
import ButtonSimple from '@/components/buttons/ButtonSimple';
import { useRouter } from 'next/navigation';
export default function NotFound() {
    const router = useRouter();
    return (
        <div className="not-found">
            <div className="not-found-left">
                <div className="not-found-rotate">
                    <Image src={F404} alt="eclip" />
                </div>
                <div className="not-found-thumb">
                    <Image src={Eclip} alt="eclip" width={500} height={500} />
                </div>
            </div>
            <div className="not-found-right">
                <h1>404</h1>
                <h2>Trang không tìm thấy</h2>
                <p>
                    Chúng tôi rất tiếc. Không thể tìm thấy trang bạn yêu cầu. <br />
                    Vui lòng quay lại trang chủ.
                </p>
                <ButtonSimple
                    text="Quay lại trang chủ"
                    className="not-found-button"
                    onClick={() => {
                        router.push('/');
                    }}
                />
            </div>
        </div>
    );
}
