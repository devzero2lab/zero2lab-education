import React from "react";
import Image from "next/image";

function MLCertificate() {
  return (
    <section className="p-5 border border-[#2882ff] rounded-lg my-5 flex flex-col gap-5 lg:p-10">
      <div>
        <p className="text-xl font-bold">
          Add Value to Your Career With{" "}
          <span className="text-[#2e2ed2] text-2xl">Certification</span>
        </p>
      </div>
      <div>
        <Image
          src={"/images/courses/ml/certificate.png"}
          alt="certificate-img"
          width={400}
          height={400}
          className="w-[full] h-auto"
        />
      </div>
    </section>
  );
}

export default MLCertificate;
