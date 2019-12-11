/* eslint-disable react/prop-types */

import React from 'react'
import { Descriptions } from 'antd'
import './ContractDetail.style.scss'
import MainLayout from 'components/MainLayout'

const ContractDetailComponent = () => {
  // useEffect(() => {
  //   const idContract = match.params.idContract;
  //   console.log("atch: ", idContract)
  //   async function fetchData() {
  //     // const result = await TagService.getAllTag()
  //     // console.log("result: ", result);
  //     // setTagList(result)
  //   }
  //   fetchData()
  // }, [])

  return (
    <MainLayout>
      <div className="contract-detail-component">
        <div className="contract-detail-component__info">
          <div className="contract-detail-component__info--teacher">
            <Descriptions title="User Info">
              <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
              <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
              <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
              <Descriptions.Item label="Remark">empty</Descriptions.Item>
              <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
              </Descriptions.Item>
            </Descriptions>
          </div>
          <div className="contract-detail-component__info--student" />
        </div>
      </div>
    </MainLayout>
  )
}

export default ContractDetailComponent
