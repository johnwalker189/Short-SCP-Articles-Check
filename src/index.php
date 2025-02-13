<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/css/bootstrap.min.css" integrity="sha384-MCw98/SFnGE8fJT3GXwEOngsV7Zt27NXFoaoApmYm81iuXoPkFOJwJ8ERdknLPMO" crossorigin="anonymous">
    <title>Document</title>
    <script src="GetList.js"></script>
</head>
<body>
    
    <style>
        .page-header {
            background-color: plum;
            height: 10%;
        }
        #head-wrap {
            height: 100%;;
        }
        #wrap-content {
            font-size: 3rem;
        }
        .table a:hover {
        background-color: #8B0000 !important; 
        color: #fff !important;               
        text-decoration: underline;
        padding: 0px 0px; 
        }
    </style>

    <div class="container-fluid">
        <div class="page-header row justify-content-center align-items-center">
            <div class="col-12 d-flex justify-content-center align-items-center" id="head-wrap">
                <p class="fw-bold text-white fs-1" id="wrap-content">
                LIỆT KÊ BÀI VIẾT CHƯA CÓ BẢN DỊCH TIẾNG VIỆT
                </p>
                
            </div>
        </div>
        <div class="row justify-content-center align-items-center" style="padding:12px;">
            <div class="col-12 justify-content-center align-items-center">
                <p class="fw-bold fs-1 text-center" style=" font-size:1.1rem">
                    Đây là công cụ giúp lọc ra những bài viết chưa được dịch sang tiếng Việt trên Wiki SCP-VN và sắp xếp chúng theo thứ tự tứ ngắn nhất tới dài nhất.
                    Hiện tại công cụ này đang sử dụng API của CROM để lấy dữ liệu về văn bản, do vậy, số lượng từ trong bài viết chỉ mang tính tượng trưng, có thể không thể hiện chính xác độ dài của bài viết.
                    Cảm ơn các bạn đã sử dụng công cụ này : D
                </p>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12 col-md-12">
                <form>
                    <div class="form-group">
                        <label for="TagBox">Nhập tag muốn thêm vào:</label>
                        <input type="text" class="form-control" id="TagBox" placeholder="Nhập những tag mà bạn muốn chúng xuất hiện trong bài. VD: tale, bittersweet, horror,...">
                    </div>
                    <div class="form-group">
                        <label for="ExcludedTagBox">Nhập tag muốn loại ra:</label>
                        <input type="text" class="form-control" id="ExcludedTagBox" placeholder="Nhập những tag mà bạn muốn chúng xuất hiện trong bài. Cú pháp tương tự như trên.">
                    </div>
                    <div class="text-center"> 
                        <button type="button" class="btn btn-primary" onclick="GetListByTagButCrom()">Lấy Danh Sách</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="row" id="result" style="margin-top: 20px;">
        
        </div>
    </div>




    <script>
        GetListByTagButCrom();
    </script>

    <script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.14.3/dist/umd/popper.min.js" integrity="sha384-ZMP7rVo3mIykV+2+9J3UJ46jBk0WLaUAdn689aCwoqbBJiSnjAK/l8WvCWPIPm49" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.1.3/dist/js/bootstrap.min.js" integrity="sha384-ChfqqxuZUCnJSK3+MXmPNIyE6ZbWh2IMqE241rYiqJxyMiZ6OW/JmZQ5stwEULTy" crossorigin="anonymous">
    </script>
</body>
</html>
