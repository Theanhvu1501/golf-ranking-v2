import { Col, Form, Input, Row } from "antd";
import { FormInstance } from "antd/es/form/Form";
import { FC } from "react";
interface BannerProps {
  form: FormInstance<any>;
  onSearch: () => void;
}

const Search: FC<BannerProps> = ({ form, onSearch }) => {
  return (
    <div className="container mx-auto">
      <div className="flex flex-wrap items-center">
        <div className="w-10/12 md:w-6/12 lg:w-8/12 px-12 md:px-4 mr-auto ml-auto -mt-24 ">
          <div className="rounded-lg relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-lg bg-lightBlue-500 p-5 lg:p-10">
            <Form form={form} layout="vertical">
              <Row gutter={24}>
                <Col span={7}>
                  <Form.Item label={"Thành viên"} name="userName">
                    <Input
                      placeholder="Nhập thành viên"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:ring-0 w-full ease-linear transition-all duration-150"
                    />
                  </Form.Item>
                </Col>

                <Col span={7}>
                  <Form.Item label={"Mã VJGR"} name="codeVJGR">
                    <Input
                      placeholder="Nhập mã VJGR"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:ring-0 w-full ease-linear transition-all duration-150"
                    />
                  </Form.Item>
                </Col>
                <Col span={7}>
                  <Form.Item label={"Quốc tịch"} name="country">
                    <Input
                      placeholder="Nhập quốc tịch"
                      className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow  focus:ring-0 w-full ease-linear transition-all duration-150"
                    />
                  </Form.Item>
                </Col>
                <Col span={3}>
                  <div className="w-full h-full flex items-center justify-end">
                    <button
                      onClick={() => onSearch()}
                      className="m-h-[44px] px-6 h-[44px] mt-1 hover:shadow-lg rounded-lg outline-none focus:outline-none shadow bg-primary text-white  text-sm leading-4"
                    >
                      Tìm kiếm
                    </button>
                  </div>
                </Col>
              </Row>
            </Form>
            {/* <div className="flex gap-x-3 flex-auto p-5 lg:p-10">
              <div className="relative w-full mb-3 ">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="full-name"
                >
                  Full Name
                </label>
                <input
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Full Name"
                />
              </div>

              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                >
                  Email
                </label>
                <input
                  type="email"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Email"
                />
              </div>
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="email"
                ></label>
                <button className="px-10 py-3 hover:shadow-lg outline-none focus:outline-none shadow bg-primary text-white  text-sm leading-4">
                  Tìm kiếm
                </button>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
