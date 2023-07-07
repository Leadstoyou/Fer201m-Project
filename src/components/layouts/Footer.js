import React from "react";

function Footer() {
  return (
    <div class="container" style={{borderLeft:'none',borderRight:'none'}}>
      <div class="row" style={{padding:'15px'}}>
        <div class="col-8">
          <div class="row">
            <div class="row">
              <div class="col-4">
                <div class="col-footer">
                  <div class="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>VỀ CHÚNG TÔI</div>
                  <div class="nav_footer">
                    <p>Câu chuyện thương hiệu</p>
                    <p>Đôi Cánh Yêu Thương</p>
                    <p>Tin tức</p>
                    <p>Tuyển dụng</p>
                    <p>Liên hệ</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="col-footer">
                  <div class="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>CHÍNH SÁCH BÁN HÀNG</div>
                  <div class="nav_footer">
                    <p>Chính sách đổi hàng</p>
                    <p>Chính sách bảo hành</p>
                    <p>Chính sách hội viên</p>
                    <p>Chính sách giao nhận</p>
                    <p>Hướng dẫn mua hàng</p>
                    <p>Chính sách bảo mật</p>
                  </div>
                </div>
              </div>
              <div class="col-4">
                <div class="col-footer">
                  <div class="headingFooter" style={{fontWeight:'650',fontSize:'medium',paddingBottom:'20px'}}>TƯ VẤN</div>
                  <div class="nav_footer">
                    <p>Tư vấn phong cách</p>
                    <p>Tư vấn chọn size</p>
                    <p>Hỏi đáp</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="col-4">
          <div class="col-info-right">
            <h4>THEO DÕI BẢN TIN CỦA CHÚNG TÔI</h4>
            <br />
          </div>
        </div>
      </div>
    </div>
  );
}
export default Footer;
