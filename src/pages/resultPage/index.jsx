import { useLocation } from 'react-router-dom';
import { getBillingResultPage } from '../../api/api';
import React, { useEffect, useState } from 'react';
import { truncate } from '../../components/Meeting';
import styled, { css } from 'styled-components';
import SlideCheckbox from '../../components/common/SlideCheckBox';
import Lottie from 'lottie-react';
import animationMoney from '../../assets/animations/money.json';
import animationStart from '../../assets/animations/start.json';
import { Link, useNavigate } from 'react-router-dom';
import animationData from '../../assets/animations/check.json';
import {
    PaymentSkeleton,
    BillingSkeleton,
} from '../../components/result/Skeleton';
import { Skeleton } from '@/components/ui/skeleton';
import ToastPopUp from '@/components/common/ToastPopUp';
import { ImageGallery } from '@/components/Modal/ImageModal';

const ResultContaner = styled.div``;

const MeetingContaner = styled.div`
    text-align: center;
    position: relative;

    border-bottom: 1px solid #e8e8e8;
    padding-top: 20px;
`;

const MeetingName = styled.h1`
    font-size: 18px;
    color: #333;
    text-align: center;
    font-weight: bold;
`;

const MeetingDate = styled.div`
    font-size: 16px;
    margin-top: 5px;
    margin-bottom: 5px;
    color: black;
    text-align: center;
`;

const LottieContainer = styled.div`
    width: 30px;
    height: 30px;
`;

const StartAnimation = styled.div`
    width: 120px;
    height: 120px;
`;

const BillingLine = styled.div`
    border: none;
    overflow: hidden;
    border-radius: 28px;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
`;

const BillingLeader = styled.div``;

const LeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const MemberContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    align-items: flex-end;
    justify-content: space-between;
`;

const DepositCopyContaner = styled.div`
    display: flex;
    gap: 4px;
    span {
        font-size: 13px;
        color: #191f28;
        font-weight: 700;
    }
    img {
        width: 20px;
        height: 20px;
    }
`;

const TossPayContaner = styled.div`
    a {
        font-size: 13px;
        text-decoration: none;
    }
    img {
        width: 28px;
        height: 28px;
        border-radius: 100%;
        padding: 3px;
        background-color: #0050ff;
    }
    span {
        margin-left: 4px;
        color: white;
        font-weight: 700;
    }
`;

const KakaoContaner = styled.div`
    a {
        font-size: 13px;
        text-decoration: none;
    }
    img {
        width: 28px;
        height: 28px;
        border-radius: 100%;
        padding: 3px;
        background-color: #fee500;
    }
    span {
        color: #191f28;
        font-weight: 700;
    }
`;

const BillingMemberContainer = styled.div`
    display: flex;
    justify-content: space-between;
    height: auto;
`;

const StyledCheckboxLabel = styled.div`
    display: flex;
    align-items: center;

    span {
        margin-left: 8px;
        font-size: 13px;
        color: #191f28;
        font-weight: 600;
    }
`;

const TitleContainer = styled.div`
    display: flex;
    gap: 5px;
    align-items: center;
    justify-content: center;
    margin: 15px 0px;
`;

const Line = styled.div`
    height: 10px;
    width: 100%;
    background-color: #e8e8e8b0;
    box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.1);
`;

const RemittanceTitle = styled.span`
    font-size: 14px;
    color: #191f28;
    font-weight: 700;
`;

const RemittanceContainer = styled.div`
    display: flex;
    gap: 10px;
`;

const NbbangButton = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    align-items: center;
    flex-direction: column;
    justify-content: center;
    margin-top: 50px;
    position: relative;
    gap: 10px;
    font-weight: 600;
    font-size: 17px;
    a {
        position: relative;
        z-index: 10;
        color: gray;
        font-size: 17px;
    }
`;

const SkeletonCount = 3;

function SharePage() {
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const meeting = searchParams.get('meeting');
    const navigate = useNavigate();
    const [apiRequestFailed, setApiRequestFailed] = useState(false);
    const [billingRequestFailed, setBillingRequestFailed] = useState(false);
    const [openToast, setOpenToast] = useState(false);
    const [members, setMembers] = useState([]);
    const [payments, setPayments] = useState([]);
    const [meetings, setMeetings] = useState([]);
    const [tipChack, setTipChack] = useState(false);
    const [loading, setLoading] = useState(true);

    const isMobile =
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
            navigator.userAgent,
        );

    const isApple = /iPhone|iPad|iPod/i.test(navigator.userAgent);

    useEffect(() => {
        const handleGetData = async (retryCount = 0) => {
            try {
                const responseGetData = await getBillingResultPage(meeting);
                if (responseGetData.status === 200) {
                    setMembers(responseGetData.data.members);
                    setPayments(responseGetData.data.payments);
                    setMeetings(responseGetData.data.meeting);
                } else if (responseGetData.status === 204) {
                    setBillingRequestFailed(true);
                    console.log('데이터 값이 없습니다');
                }
            } catch (error) {
                console.error(error);
                if (
                    members.length === 0 &&
                    payments.length === 0 &&
                    retryCount < 3
                ) {
                    console.log(`재요청 중... 시도 횟수: ${retryCount + 1}`);
                    setTimeout(() => handleGetData(retryCount + 1), 1000);
                }

                if (error.response && error.response.status === 404) {
                    setApiRequestFailed(true);
                    setTimeout(() => {
                        navigate('/');
                    }, 3000);
                } else {
                    console.log('API 데이터 불러오기 실패');
                }
            }
            setLoading(false);
        };

        handleGetData();
    }, [meeting]);

    if (apiRequestFailed) {
        return (
            <div>
                <MeetingName>
                    삭제된 정산내역입니다. <br></br> Nbbang페이지로 3초 뒤에
                    넘어갑니다.
                </MeetingName>
            </div>
        );
    }

    if (billingRequestFailed) {
        return (
            <div>
                <MeetingName>
                    정산 내역이 없습니다. <br></br> 정산내역을 추가해주세요!
                </MeetingName>
            </div>
        );
    }

    const handleCheckboxChange = (memberId) => {
        setTipChack(!tipChack);
        setMembers((prevMembers) =>
            prevMembers.map((member) =>
                member.id === memberId
                    ? { ...member, tipCheck: !member.tipCheck }
                    : member,
            ),
        );
    };

    const DepositInformationCopy = async (deposit_copy_text) => {
        await navigator.clipboard.writeText(deposit_copy_text);
        if (isApple) {
            setOpenToast(true);
        }
    };

    return (
        <ResultContaner>
            {loading ? (
                <div className="flex justify-center border-b border-gray-100 py-4">
                    <Skeleton className="w-[250px] h-7 bg-gray-100 text-center" />
                </div>
            ) : (
                <MeetingContaner>
                    <MeetingDate>
                        {meetings?.date?.replace(
                            /(\d{4})-(\d{2})-(\d{2})/,
                            '$1년 $2월 $3일',
                        ) || ''}
                    </MeetingDate>
                    <TitleContainer>
                        <LottieContainer>
                            <Lottie
                                animationData={animationMoney}
                                loop={true}
                                autoplay={true}
                            />
                        </LottieContainer>
                        <MeetingName>{meetings.name}의 정산결과</MeetingName>
                    </TitleContainer>
                    {meetings.images ? (
                        <ImageGallery images={meetings.images} />
                    ) : (
                        ''
                    )}
                </MeetingContaner>
            )}
            <BillingLine>
                <BillingContainer>
                    {loading
                        ? Array.from({ length: SkeletonCount }).map(
                              (_, index) => <BillingSkeleton key={index} />,
                          )
                        : members.map((data) => (
                              <BillingHistory key={data.id}>
                                  {data.leader ? (
                                      <>
                                          <BillingLeader>
                                              <LeaderContainer>
                                                  <Member>
                                                      총무 {data.name}
                                                  </Member>
                                                  <LeaderAmount>
                                                      {data.amount > 0
                                                          ? `보내야 할 돈 : ${data.amount
                                                                .toLocaleString()
                                                                .toString()} 원`
                                                          : `받아야 할 돈 : ${Math.abs(
                                                                data.amount,
                                                            )
                                                                .toLocaleString(
                                                                    {
                                                                        style: 'currency',
                                                                        currency:
                                                                            'USD',
                                                                    },
                                                                )
                                                                .toString()} 원`}
                                                  </LeaderAmount>
                                              </LeaderContainer>
                                              <LeaderBillingContainer>
                                                  {members.map((value) =>
                                                      value.amount < 0 &&
                                                      value.leader === false ? (
                                                          <LeaderBillingContainer
                                                              key={value.id}
                                                          >
                                                              <LeaderBillingMoney>{`${
                                                                  value.name
                                                              }님 한테 ${Math.abs(
                                                                  value.amount,
                                                              )
                                                                  .toLocaleString(
                                                                      {
                                                                          style: 'currency',
                                                                          currency:
                                                                              'USD',
                                                                      },
                                                                  )
                                                                  .toString()}원을 보내주세요`}</LeaderBillingMoney>
                                                          </LeaderBillingContainer>
                                                      ) : null,
                                                  )}
                                              </LeaderBillingContainer>
                                          </BillingLeader>
                                      </>
                                  ) : (
                                      <>
                                          <BillingMemberContainer>
                                              <Billings>
                                                  <Member>{data.name}</Member>
                                                  {data.amount >= 0 ? (
                                                      <Amount>
                                                          {data.tipCheck
                                                              ? `총무에게 보내야 할 돈 : ${data.tipped_amount
                                                                    .toLocaleString(
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'USD',
                                                                        },
                                                                    )
                                                                    .toString()} 원`
                                                              : `총무에게 보내야 할 돈 : ${data.amount
                                                                    .toLocaleString(
                                                                        {
                                                                            style: 'currency',
                                                                            currency:
                                                                                'USD',
                                                                        },
                                                                    )
                                                                    .toString()} 원`}
                                                      </Amount>
                                                  ) : (
                                                      <Amount>
                                                          {`총무에게 받아야 할 돈 : ${Math.abs(
                                                              data.amount,
                                                          )
                                                              .toLocaleString({
                                                                  style: 'currency',
                                                                  currency:
                                                                      'USD',
                                                              })
                                                              .toString()} 원`}
                                                      </Amount>
                                                  )}
                                                  {isMobile &&
                                                      data.amount >= 0 && (
                                                          <StyledCheckboxLabel>
                                                              <SlideCheckbox
                                                                  type="checkbox"
                                                                  checked={
                                                                      data.tipCheck
                                                                  }
                                                                  onChange={() =>
                                                                      handleCheckboxChange(
                                                                          data.id,
                                                                      )
                                                                  }
                                                              />
                                                              <span>
                                                                  십원단위 올림
                                                              </span>
                                                          </StyledCheckboxLabel>
                                                      )}
                                              </Billings>
                                              {isMobile ? (
                                                  <>
                                                      {data.amount > 0 &&
                                                      data.tipCheck ? (
                                                          <MemberContainer>
                                                              <RemittanceTitle>
                                                                  송금
                                                              </RemittanceTitle>
                                                              <RemittanceContainer>
                                                                  {data.tipped_kakao_deposit_link && (
                                                                      <KakaoContaner>
                                                                          <a
                                                                              href={
                                                                                  data.tipped_kakao_deposit_link
                                                                              }
                                                                          >
                                                                              <img
                                                                                  alt="kakao"
                                                                                  src="/images/kakao 2.png"
                                                                              />
                                                                          </a>
                                                                      </KakaoContaner>
                                                                  )}
                                                                  {data.tipped_toss_deposit_link && (
                                                                      <TossPayContaner>
                                                                          <a
                                                                              href={
                                                                                  data.tipped_toss_deposit_link
                                                                              }
                                                                          >
                                                                              <img
                                                                                  alt="Toss"
                                                                                  src="/images/result_toss.png"
                                                                              />
                                                                          </a>
                                                                      </TossPayContaner>
                                                                  )}
                                                              </RemittanceContainer>
                                                              {data.tipped_deposit_copy_text && (
                                                                  <DepositCopyContaner
                                                                      onClick={() =>
                                                                          DepositInformationCopy(
                                                                              data.deposit_copy_text,
                                                                          )
                                                                      }
                                                                  >
                                                                      <span>
                                                                          계좌&금액
                                                                      </span>
                                                                      <img
                                                                          src="/images/copy.png"
                                                                          alt="copy"
                                                                      />
                                                                  </DepositCopyContaner>
                                                              )}
                                                          </MemberContainer>
                                                      ) : (
                                                          <MemberContainer>
                                                              {data.amount >
                                                                  0 && (
                                                                  <RemittanceTitle>
                                                                      송금
                                                                  </RemittanceTitle>
                                                              )}
                                                              <RemittanceContainer>
                                                                  {data.amount >
                                                                      0 &&
                                                                      data.kakao_deposit_link && (
                                                                          <KakaoContaner>
                                                                              <a
                                                                                  href={
                                                                                      data.kakao_deposit_link
                                                                                  }
                                                                              >
                                                                                  <img
                                                                                      alt="kakao"
                                                                                      src="/images/kakao 2.png"
                                                                                  />
                                                                              </a>
                                                                          </KakaoContaner>
                                                                      )}

                                                                  {data.amount >
                                                                      0 &&
                                                                      data.toss_deposit_link && (
                                                                          <TossPayContaner>
                                                                              <a
                                                                                  href={
                                                                                      data.toss_deposit_link
                                                                                  }
                                                                              >
                                                                                  <img
                                                                                      alt="Toss"
                                                                                      src="/images/result_toss.png"
                                                                                  />
                                                                              </a>
                                                                          </TossPayContaner>
                                                                      )}
                                                              </RemittanceContainer>
                                                              {data.amount >
                                                                  0 &&
                                                                  data.deposit_copy_text && (
                                                                      <DepositCopyContaner
                                                                          onClick={() =>
                                                                              DepositInformationCopy(
                                                                                  data.deposit_copy_text,
                                                                              )
                                                                          }
                                                                      >
                                                                          <span>
                                                                              계좌&금액
                                                                          </span>
                                                                          <img
                                                                              src="/images/copy.png"
                                                                              alt="copy"
                                                                          />
                                                                      </DepositCopyContaner>
                                                                  )}
                                                          </MemberContainer>
                                                      )}
                                                  </>
                                              ) : (
                                                  ''
                                              )}
                                          </BillingMemberContainer>
                                      </>
                                  )}
                              </BillingHistory>
                          ))}
                </BillingContainer>
                <BillingLineComent>
                    결제내역을 확인해보세요!
                    <LottieContainer>
                        <Lottie
                            animationData={animationData}
                            loop={true}
                            autoplay={true}
                        />
                    </LottieContainer>
                </BillingLineComent>

                {loading
                    ? Array.from({ length: SkeletonCount }).map((_, index) => (
                          <PaymentSkeleton key={index} />
                      ))
                    : payments.map((paymentdata) => (
                          <PaymentList key={paymentdata.id}>
                              <PaymentContainers>
                                  <PaymentUserContainer
                                  //   onClick={() => handleClick(paymentdata)} ? 클릭시 에버나서 그냥 주섯처리해버림
                                  >
                                      <Payment>
                                          <PaymentPlace
                                              paymentdata={paymentdata}
                                          >
                                              {paymentdata.place}
                                          </PaymentPlace>
                                          <PaymentPayer
                                              paymentdata={paymentdata}
                                          >
                                              {paymentdata.pay_member}
                                          </PaymentPayer>
                                      </Payment>
                                      <Payment isRight>
                                          <PaymentPrice>
                                              {paymentdata.price
                                                  .toLocaleString()
                                                  .toString() + '원'}
                                          </PaymentPrice>
                                          <PaymentSplitPrice>
                                              인당{' '}
                                              {paymentdata.split_price.toLocaleString()}
                                              원
                                          </PaymentSplitPrice>
                                      </Payment>
                                  </PaymentUserContainer>
                                  <PaymentMembers>
                                      {paymentdata.attend_member.map(
                                          (attendMemberdata, index) => (
                                              <div key={index}>
                                                  <span>
                                                      {truncate(
                                                          attendMemberdata,
                                                          4,
                                                      )}
                                                  </span>
                                              </div>
                                          ),
                                      )}
                                  </PaymentMembers>
                              </PaymentContainers>
                          </PaymentList>
                      ))}
            </BillingLine>
            {openToast && (
                <ToastPopUp
                    setToastPopUp={setOpenToast}
                    message={'클립보드에 복사되었어요.'}
                />
            )}
            <NbbangButton>
                <Link to="/signd">복잡한 정산, 원클릭으로 해결하러가기</Link>
                <StartAnimation>
                    <Lottie
                        animationData={animationStart}
                        loop={true}
                        autoplay={true}
                    />
                </StartAnimation>
            </NbbangButton>
        </ResultContaner>
    );
}
export default SharePage;

const PaymentList = styled.div`
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 90%;
    max-width: 400px;
    margin: 12px auto;
    padding: 10px 10px;
    background: white;
    border-radius: 16px;
    border: 1px solid #e5e8eb;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    transition: all 0.2s ease;
`;
const PaymentContainers = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 2px;
`;

const Payment = styled.div`
    display: flex;
    flex-direction: column;
    align-items: ${(props) => (props.isRight ? 'flex-end' : 'flex-start')};
    gap: 8px;
    padding: 8px;
    border-radius: 12px;
    transition: all 0.2s;
    flex: 1;
    justify-content: space-between;
`;

const PaymentPlace = styled.span`
    font-size: 16px;
    font-weight: 700;
    color: #191f28;
    margin-bottom: 4px;
`;

const PaymentPrice = styled.span`
    font-size: 18px;
    font-weight: 700;
    color: black;
    text-align: right;
`;
const PaymentPayer = styled.span`
    font-size: 15px;
    font-weight: 500;
    color: #4e5968;
    display: flex;
    align-items: center;
    gap: 4px;

    &::before {
        content: '결제자';
        font-size: 13px;
        color: #8b95a1;
    }
`;

const PaymentSplitPrice = styled.span`
    font-size: 15px;
    font-weight: 600;
    color: black;
    opacity: 0.8;
    text-align: right;
`;

const PaymentMembers = styled.div`
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    gap: 8px;
    margin-top: 4px;
    width: 100%;

    div {
        background: rgba(49, 130, 246, 0.06);
        border-radius: 10px;
        padding: 8px 14px;
        transition: all 0.2s;
    }

    span {
        font-size: 12px;
        font-weight: 600;
        color: #3182f6;
    }
`;

const PaymentUserContainer = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BillingContainer = styled.div`
    width: 100%;
`;

const BillingHistory = styled.div`
    margin: 10px 0;
    padding: 15px 20px;
    background: white;
    border-bottom: 1px solid #e8f0fe;
`;

const LeaderBillingContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`;

const Member = styled.p`
    font-size: 14px;
    font-weight: 800;
    color: rgb(0, 68, 254);
`;

const Amount = styled.p`
    color: black;
    font-size: 14px;
    font-weight: 600;
    position: relative;
`;

const Billings = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    gap: 8px;
`;

const LeaderAmount = styled(Amount)`
    color: black;
    font-weight: 500;
    font-size: 14px;
    margin-top: 12px;
`;
const LeaderBillingMoney = styled.span`
    font-size: 14px;
    color: #3c4043;
    margin-top: 8px;
    display: block;
`;
const BillingLineComent = styled.h2`
    font-size: 18px;
    font-weight: 800;
    color: #191f28;
    padding: 20px 0px;
    display: flex;
    justify-content: center;
    align-items: center;
`;
