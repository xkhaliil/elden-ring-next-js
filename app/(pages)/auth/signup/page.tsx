import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

export default function Signup() {
  return (
    <div className="relative h-screen w-screen bg-[#4880FF]">
      <svg
        className="absolute inset-0 h-full w-full"
        viewBox="0 0 1440 1070"
        fill="none"
        preserveAspectRatio="xMidYMid slice"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M272.5 1380.44C519.647 1380.44 720 1180.09 720 932.944C720 800.82 401.153 910.36 310.095 828.444C230.823 757.131 387.523 485.444 272.5 485.444C25.3526 485.444 -175 685.797 -175 932.944C-175 1180.09 25.3526 1380.44 272.5 1380.44Z"
          fill="#568AFF"
        />
        <path
          opacity="0.541829"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M864.471 -208.471C814.505 74.8982 1003.72 345.119 1287.08 395.085C1438.57 421.796 1377.44 34.0743 1489.77 -53.768C1587.56 -130.241 1867.39 104.351 1890.64 -27.5293C1940.61 -310.898 1751.4 -581.119 1468.03 -631.085C1184.66 -681.05 914.436 -491.84 864.471 -208.471Z"
          fill="#568AFF"
        />
        <path
          opacity="0.6"
          fillRule="evenodd"
          clipRule="evenodd"
          d="M219.512 -233.502C-12.7302 -148.972 -132.475 107.822 -47.946 340.065C-2.7568 464.221 259.396 252.235 372.979 298.067C471.861 337.967 417.534 646.864 525.62 607.523C757.863 522.994 877.608 266.2 793.079 33.9569C708.55 -198.286 451.755 -318.031 219.512 -233.502Z"
          fill="#568AFF"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M2006.38 1032.4C2061.52 719.665 1852.7 421.436 1539.96 366.292C1372.77 336.812 1440.24 764.72 1316.27 861.667C1208.34 946.066 899.512 687.159 873.848 832.709C818.703 1145.45 1027.53 1443.68 1340.26 1498.82C1653 1553.97 1951.23 1345.14 2006.38 1032.4Z"
          fill="#568AFF"
        />
      </svg>

      <div className="relative z-10 flex h-full w-full items-center justify-center">
        <div
          style={{ borderRadius: "16px" }}
          className="h-full max-h-150.25 w-full max-w-127.5 bg-white p-8 shadow-lg"
        >
          <div className="flex flex-col items-center justify-center">
            <div className="text-2xl font-bold text-[#202224]">
              Create an Account
            </div>
            <div className="mt-2 text-xs font-light text-[#202224]">
              Create an account to continue
            </div>
            <div className="mt-10 w-full items-start justify-start gap-2">
              <div className="text-xs text-[#202224]">Email address:</div>
              <div className="mt-3 max-h-14 w-full max-w-129">
                <input
                  type="email"
                  placeholder="test@test.com"
                  className="w-full rounded-2xl bg-[#F1F4F9] px-4 py-3 text-sm text-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-10 w-full items-start justify-start gap-2">
              <div className="text-xs text-[#202224]">Username</div>
              <div className="mt-3 max-h-14 w-full max-w-129">
                <input
                  type="username"
                  placeholder="jhondoe"
                  className="w-full rounded-2xl bg-[#F1F4F9] px-4 py-3 text-sm text-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-10 w-full items-start justify-start gap-2">
              <div className="flex items-center justify-between">
                <div className="text-xs text-[#202224]">Password</div>
                <div className="text-xs font-light text-[#202224]">
                  Forget Password?
                </div>
              </div>

              <div className="mt-3 max-h-14 w-full max-w-129">
                <input
                  type="password"
                  placeholder="********"
                  className="w-full rounded-2xl bg-[#F1F4F9] px-4 py-3 text-sm text-gray-500 focus:outline-none"
                />
              </div>
            </div>
            <div className="mt-2 w-full items-start justify-start gap-2">
              <div className="text-xs text-[#202224]">
                <FieldGroup className="w-56">
                  <Field orientation="horizontal">
                    <Checkbox
                      id="terms-checkbox"
                      name="terms-checkbox"
                      className="border-gray-400 data-[state=checked]:border-black data-[state=checked]:bg-black"
                    />
                    <Label
                      htmlFor="terms-checkbox"
                      className="text-xs font-light whitespace-nowrap text-gray-500"
                    >
                      I accept terms and conditions
                    </Label>
                  </Field>
                </FieldGroup>
              </div>
            </div>

            <button className="mt-6 w-full max-w-84.5 rounded-2xl bg-[#4880FF] px-4 py-3 text-sm font-medium text-white hover:bg-[#3A6FD8] focus:outline-none">
              Sign Up
            </button>
            <div className="mt-2 flex items-center gap-1 text-xs font-light whitespace-nowrap text-gray-500">
              <div>Already have an account?</div>
              <div className="text-blue-500 underline">Login</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
