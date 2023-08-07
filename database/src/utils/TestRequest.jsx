import request from "../services/request"
import { message } from "antd"

export default (props) => {
  return (
    <>
      <button
        onClick={() => {
          request(props.url, props.body, props.operation).then((result) => {
            console.log(result)
          })
        }}
      >
        Test
      </button>
    </>
  )
}
