<template>
  <div id="container">
    <van-nav-bar title="支付" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

    <h2 class="pay">
      需支付：
      <span>￥100</span>
    </h2>
    <ul class="pay-style">
      <li>
        <label class="am-radio-inline">
          <input
            type="radio"
            checked="checked"
            name="radio10"
            value="1"
            data-am-ucheck
            class="am-ucheck-radio"
          />
          <span class="am-ucheck-icons"></span>
        </label>
        <img
          src="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MUVFNjBFNDVBNjcxRTYxMUI5M0JCMTM2MDA4QjUzMzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjAzRjdCRkM3QkRDMTFFNjhCNDBGNzQwOTNFOTFFQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjAzRjdCRkI3QkRDMTFFNjhCNDBGNzQwOTNFOTFFQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRjQxQThERUIzNzFFNjExQjkzQkIxMzYwMDhCNTMzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRUU2MEU0NUE2NzFFNjExQjkzQkIxMzYwMDhCNTMzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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"
          width="25"
        />
        <span>微信支付</span>
      </li>
      <li>
        <label class="am-radio-inline">
          <input type="radio" name="radio10" value="1" data-am-ucheck class="am-ucheck-radio" />
          <span class="am-ucheck-icons">
            <i class="am-icon-unchecked"></i>
            <i class="am-icon-checked"></i>
          </span>
        </label>
        <img
          src="data:image/jpg;base64,/9j/4QAYRXhpZgAASUkqAAgAAAAAAAAAAAAAAP/sABFEdWNreQABAAQAAABkAAD/4QNvaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wLwA8P3hwYWNrZXQgYmVnaW49Iu+7vyIgaWQ9Ilc1TTBNcENlaGlIenJlU3pOVGN6a2M5ZCI/PiA8eDp4bXBtZXRhIHhtbG5zOng9ImFkb2JlOm5zOm1ldGEvIiB4OnhtcHRrPSJBZG9iZSBYTVAgQ29yZSA1LjMtYzAxMSA2Ni4xNDU2NjEsIDIwMTIvMDIvMDYtMTQ6NTY6MjcgICAgICAgICI+IDxyZGY6UkRGIHhtbG5zOnJkZj0iaHR0cDovL3d3dy53My5vcmcvMTk5OS8wMi8yMi1yZGYtc3ludGF4LW5zIyI+IDxyZGY6RGVzY3JpcHRpb24gcmRmOmFib3V0PSIiIHhtbG5zOnhtcE1NPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvbW0vIiB4bWxuczpzdFJlZj0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL3NUeXBlL1Jlc291cmNlUmVmIyIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bXBNTTpPcmlnaW5hbERvY3VtZW50SUQ9InhtcC5kaWQ6MUVFNjBFNDVBNjcxRTYxMUI5M0JCMTM2MDA4QjUzMzkiIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RjA0MUREQUM3QkRDMTFFNjhCNDBGNzQwOTNFOTFFQkIiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RjA0MUREQUI3QkRDMTFFNjhCNDBGNzQwOTNFOTFFQkIiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENTNiAoV2luZG93cykiPiA8eG1wTU06RGVyaXZlZEZyb20gc3RSZWY6aW5zdGFuY2VJRD0ieG1wLmlpZDpBRjQxQThERUIzNzFFNjExQjkzQkIxMzYwMDhCNTMzOSIgc3RSZWY6ZG9jdW1lbnRJRD0ieG1wLmRpZDoxRUU2MEU0NUE2NzFFNjExQjkzQkIxMzYwMDhCNTMzOSIvPiA8L3JkZjpEZXNjcmlwdGlvbj4gPC9yZGY6UkRGPiA8L3g6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"
          width="25"
        />
        <span>支付宝支付</span>
      </li>
      <li>
        <label class="am-radio-inline">
          <input
            type="radio"
            checked
            name="radio10"
            value="1"
            data-am-ucheck
            class="am-ucheck-radio"
          />
          <span class="am-ucheck-icons">
            <i class="am-icon-unchecked"></i>
            <i class="am-icon-checked"></i>
          </span>
        </label>
        <img
          src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAIAAAC1JZyVAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAA2ZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuMy1jMDExIDY2LjE0NTY2MSwgMjAxMi8wMi8wNi0xNDo1NjoyNyAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOk9yaWdpbmFsRG9jdW1lbnRJRD0ieG1wLmRpZDoxRUU2MEU0NUE2NzFFNjExQjkzQkIxMzYwMDhCNTMzOSIgeG1wTU06RG9jdW1lbnRJRD0ieG1wLmRpZDpGMDQxRERCMDdCREMxMUU2OEI0MEY3NDA5M0U5MUVCQiIgeG1wTU06SW5zdGFuY2VJRD0ieG1wLmlpZDpGMDQxRERBRjdCREMxMUU2OEI0MEY3NDA5M0U5MUVCQiIgeG1wOkNyZWF0b3JUb29sPSJBZG9iZSBQaG90b3Nob3AgQ1M2IChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOkFGNDFBOERFQjM3MUU2MTFCOTNCQjEzNjAwOEI1MzM5IiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjFFRTYwRTQ1QTY3MUU2MTFCOTNCQjEzNjAwOEI1MzM5Ii8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+SzTK6QAABWZJREFUeNrsl9tvG0UUh2dmZ7221/db4jhO7DQlaZy0FNomFaVUagWpUCsIiBfoC0J54lIhIdqqf0AQErwWtX0AlSKQUKmitkgIUkClNwVI3HsT23EuTdLcE9u7650Zxm6T1lu/IAEPqOORvN7ZOb85Z875Zg0ZY+Dfbwj8J+2xzGOZ/7UMK3a6fHHvuvBNVcBoGQNkZd6jlh40bBjUAFCPfYkOHxaWclCAHBH8QxE85G09aYvxqXBlPoRcg/hUWpMt6sMSEUZkhPbterG9udkoww1oJ77De96QipOKRgv+djk2768OADbGr+HKKikgLg14ZkGqbOQZUFUNofZYjC/I6I1w/Ji0HEpY7HmEu4MbkFm0lsYM6kANZTWLCRFYdj8oZUGHs+C0wRuqafDqNVjq/zi2JUwuEyPG1SJIZcKNUQq5LQQNYhBQ0hapNaYAX6uWHGLJlG4x6yZRhyhvMfP7N83+GWwTDPvPIDERYKEOUfLbZMQYLX2A/4QYt0YjxhQoxLz3MrPZlDOnhY5X2KsdyB8QDxy4JFZpFBJVN0tYJwwL3ASgeabKma1raj55+aXBu1OyKL529Iusngdoed2EhLzudTXhMglNz/4KNm1Efh8cHsHtL8CxEcXrjoebfE5xe1uY6LTazzeO8u0I+SSzW9vWsCo1NXOo5+y6cNgtiVYB2TG2C4IEoIxgrLLSabUavaHczC89+N132Pnzhf1zupjdpXx/5qDoXv3jYH2NfVNTYMvGmv5bk6EK++pqT3f6ap3Lv6YisHfHjtN9fR937A66vd1/9rVGa3VKu37oaQoGy5QnvTOKU0nW3MKsMunsVMfv4FBwfjJHNLK+mQfA0bGzZWJqqe3J6mjYezu56HJYW6qCB0+e2vPZEavFQhmrcNgvp0e2NTZazVI8kXimvq5ceV6/CVVN7+pCe16H65/Ce/eCnc/fSuR+qmwRoX59YGbD2pDFjL498ltDJJCDesKezuTyZ27cVLK57v74jobG0/ErV8bHh2dnDpw8ZbLKa0NVD9Ju5V1A+agL7dsPi/hAxYzg+/BWxe6jvjbMScPrRFFjjZWZrJbPAU8DszTRO3MLOS2/yu9V8roJ4/6h4c5tW+r9vvc+P74p1njug/exgEu84YwBFy+Jy7fu1T8B6JorjEzIzERVI0+vC3764fb+6+N2u9UdMTWEgt/09s5lsruaY7Ikjc7NLuWUgMPe+fUJnm+bI9EVjft7w42SXBbF++GD0ir0hNl9W/KZmF7MT1YdsJslcWJqsSHiEQVA9PyFxNDGumhGUe8uLgxNzTzb8MS5RDI1PQUwfjocMqKzQOIr1yCvzdI6vmytmUY2K1CKojRS7aoK+qsqXQtImVzMzKvqbDYbdroVTYmPjoU9HkUnPw8McmOiJK0tlUH30XrxAiS6ASe9lmqGGCyOUwo0nd5OjibTs1YZh72e3nSa178siR6bzWoSzSYxm88nZuY5TsJuZ10gUMYbXv+whEeAQtRvqULL2OcI6LmQ0lR9MDE/Is7NWxZms+rA1PSbx76q8bg5cvpGz3ExwhOK0sZKHl/LIzK6Dv/oM5BvEsu3zF5xmZiiiFJjmRvJq4IACZ0GPsLZCQQ0ubD4e2qoyHaBHzKAs4jR1tqIITBFmYkJOphgpWAelPzjgg1zJN4/poCAkYxMzERUP6aY+1l8HJXgivHgCqi9OVZGBjodNBqh8Th8CKMVSxOBpbsjorOEzQxSjbJpAtxawRvj2UD5zLef27ohWmsYKZQnN6oMp7kMYg/nRn5A9A1JHsSg4VTkDlE7NZzKxTQhflluq18FICorwzs04Jr+o2898PEfj7/f/hJgAOwnYLP3zOayAAAAAElFTkSuQmCC"
          width="25"
        />
        <span>银联在线支付</span>
      </li>
    </ul>
    <button class="login-btn" type="button">立即支付</button>
  </div>
</template>


<script>
export default {
  data() {
    return {};
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    ok() {
      this.$router.push("/orderList");
    }
  }
};
</script>


<style scoped lang="less">
#container {
  height: 100vh;
  background: #f5f5f5;
}
.pay {
  margin: 0.5rem 1.5%;
  font-weight: normal;
}
h2 {
  font-size: 0.8em;
  font-weight: normal;
}
.pay span {
  color: red;
}
.pay-style {
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
  margin: 1rem 3%;
}
.pay-style li {
  border-bottom: 1px solid #ddd;
  line-height: 40px;
  overflow: hidden;
  padding: 0.5rem 1rem;
}
.pay-style label {
  float: left;
  height: 22px;
  margin-top: 13px;
}
.am-radio-inline {
  padding: 0px 4px;
  position: relative;
  -webkit-transition: color 0.25s linear;
  transition: color 0.25s linear;
  font-size: 7px;
  line-height: 1.5;
  display: inline-block;
  margin-bottom: 0;
  vertical-align: middle;
  font-weight: 400;
  cursor: pointer;
}
.pay-style span {
  float: left;
  margin-left: 2.5px;
  font-size: 0.7rem;
  display: block;
}
.am-ucheck-icons {
  color: #999;
  display: block;
  text-align: center;
  line-height: 10.5px;
  font-size: 9px;
  cursor: pointer;
  position: absolute;
  width: 10px;
  left: 0;
  top: 0;
  height: 20px;
}
.am-radio-inline .am-icon-unchecked {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-table;
  margin: 0;
  background-color: transparent;
}
.am-radio-inline .am-icon-checked {
  position: absolute;
  left: 0;
  top: 0;
  display: inline-table;
  margin: 0;
  background-color: transparent;
  -webkit-transition: color 0.25s linear;
  transition: color 0.25s linear;
  opacity: 0;
}
.pay-style img {
  float: left;
  margin-left: 5px;
  margin-top: 7px;
}
.login-btn {
  margin: 0.75rem 2%;
  border: 0;
  color: #fff;
  width: 96%;
  font-size: 0.8rem;
  padding: 0.5rem;
  border-radius: 5px;
  background: #ff2c4c;
}
</style>
