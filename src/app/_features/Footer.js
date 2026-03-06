import VectorWhite from "../_icons/VectorWhiteIcon";
import Email from "../_icons/EmailIcon";
import Phone from "../_icons/PhoneIcon";
function Footer() {
  return (
    <div className="w-[1440px] h-[280px] pt-10 pb-10 gap-[48px] px-4 rotate-0 opacity-100 flex justify-center items-center  top-[320px] left-[20px] bg-[#4338CA]">
      <div className="w-[1280px] max-w-[1280px] h-[200px] gap-[120px] rotate-0 opacity-100 flex   ">
        <div className="w-[247px] h-[200px] gap-[40px] rotate-0 opacity-100">
          <div className="w-[247px] h-[52px] gap-3 rotate-0 opacity-100 flex  flex-col">
            <div className="w-[92px] h-[20px] gap-2 rotate-0 opacity-100">
              <VectorWhite />
            </div>
            <p className="w-[247px] h-[20px] text-[14px] font-normal leading-[20px] tracking-normal rotate-0 opacity-100 font-inter text-[#FAFAFA]">
              © 2024 Movie Z. All Rights Reserved.
            </p>
          </div>
        </div>
        <div className="w-[913px] h-[200px] gap-[96px] rotate-0 opacity-100 flex flex-row justify-end ">
          <div className="w-[174px] h-[200px] gap-3 rotate-0 opacity-100 flex flex-col">
            <p className="font-inter font-normal text-[14px] leading-[20px] tracking-normal text-[#FAFAFA] w-[174px] h-[20px]">
              Contact Information
            </p>
            <div className=" flex flex-col w-[174px] h-[104px] gap-6 rotate-0 opacity-100">
              <div className="flex w-[174px] h-[40px] gap-3 rotate-0 opacity-100 items-center">
                <Email />
                <div className="w-[146px] h-[40px] rotate-0 opacity-100">
                  <p className="w-[40px] h-[20px] font-inter font-medium text-[14px] leading-[20px] tracking-normal text-[#FAFAFA]">
                    Email:
                  </p>
                  <p className="w-[146px] h-[20px] font-inter font-medium text-[14px] leading-[20px] tracking-normal text-[#FAFAFA]">
                    support@movieZ.com
                  </p>
                </div>
              </div>
              <div className="flex w-[174px] h-[40px] gap-3 rotate-0 opacity-100 items-center">
                <Phone />
                <div className="w-[146px] h-[40px] rotate-0 opacity-100">
                  <p className="w-[40px] h-[20px] font-inter font-medium text-[14px] leading-[20px] tracking-normal text-[#FAFAFA]">
                    Phone:
                  </p>
                  <p className="w-[146px] h-[20px] font-inter font-medium text-[14px] leading-[20px] tracking-normal text-[#FAFAFA]">
                    +976 (11) 123-4567
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="w-[274px] h-[52px] gap-3 rotate-0 opacity-100 flex flex-col">
            <p className="w-[62px] h-[20px] font-inter font-normal text-[14px] leading-[20px] tracking-normal text-[#FAFAFA]">
              Follow us
            </p>
            <div className="w-[274px] h-[20px] gap-3 rotate-0 opacity-100 flex ">
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-normal  text-[#FAFAFA] ">
                Facebook
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-normal  text-[#FAFAFA] ">
                Instagram
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-normal  text-[#FAFAFA] ">
                Twitter
              </p>
              <p className="font-inter font-medium text-[14px] leading-[20px] tracking-normal  text-[#FAFAFA] ">
                Youtube
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
