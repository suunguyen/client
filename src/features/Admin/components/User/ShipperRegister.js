import { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import { AuthContext } from '../../contexts/AuthContext';
import { PartnerContext } from '../../contexts/PartnerContext';
import ModalPopup from '../Common/Modal';
import Header from '../../../../components/common/Header';
import Footer from '../../../../components/common/Footer';

export default function ShipperRegister() {
    const { authState: { userId } } = useContext(AuthContext);
    const { registerShipper } = useContext(PartnerContext);
    const [show, setShow] = useState(false);
    const [msg, setMsg] = useState('');
    const [path, setPath] = useState('');
    const [needRender, setNeedRender] = useState(false);

    const [frontLicense, setFrontLicense] = useState();
    const [behindLicense, setBehindLicense] = useState();
    const [vaccineCer, setVaccineCer] = useState();

    const front_lisence = () => {
        var file = document.querySelector(
            '#front_dri')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setFrontLicense(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const behind_lisence = () => {
        var file = document.querySelector(
            '#behind_dri')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setBehindLicense(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }

    const vaccine = () => {
        var file = document.querySelector(
            '#vaccine')['files'][0];

        var reader = new FileReader();

        reader.onload = function () {
            setVaccineCer(reader.result.replace("data:", "")
                .replace(/^.+,/, ""));
        }
        reader.readAsDataURL(file);
    }
    const ShipperSchema = Yup.object().shape({
        bankAccountNumber: Yup.number()
            .required('Vui lo??ng nh????p s???? ta??i khoa??n.'),
        bankName: Yup.string()
            .required('Vui lo??ng nh????p t??n ng??n ha??ng.'),
        driverLicense: Yup.number()
            .required("Vui lo??ng nh????p s???? GPLX.")
    });

    const register = async (data) => {
        try {
            data["shipperId"] = userId;
            data["frontLicense"] = frontLicense;
            data["behindLicense"] = behindLicense;
            data["vaccineCer"] = vaccineCer;
            const registerData = await registerShipper(data);
            if (registerData.status) {
                setMsg(registerData.message);
                setShow(true);
                setPath('/');
            }
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <>
            <Header />
            <div className="auth my-5">
                <h1 className="auth-title">????NG KY?? GIAO HA??NG</h1>
                <Container style={{ margin: '0 auto' }}>
                    <Formik
                        initialValues={{ driverLicense: '', bankAccountNumber: '', bankName: '' }}
                        validationSchema={ShipperSchema}
                        onSubmit={values => register(values)}
                    >
                        {({ errors, touched }) => (
                            <>
                                <Form>
                                    <div className="form">
                                        <p className="title">Th??ng tin ????ng ky??</p>
                                        <div className="mb-3">
                                            <label>Gi????y phe??p la??i xe ha??ng A1/A2</label>
                                            <Field type="text" name="driverLicense" className='inputArea' />
                                            {errors.driverLicense && touched.driverLicense ? (<p className="text-validate">{errors.driverLicense}
                                            </p>) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label>A??nh m????t tr??????c GPLX</label><br />
                                            <input type="file" id="front_dri" onChange={front_lisence} />
                                        </div>
                                        <div className="mb-3">
                                            <label>A??nh m????t sau GPLX</label><br />
                                            <input type="file" id="behind_dri" onChange={behind_lisence} />
                                        </div>
                                        <div className="mb-3">
                                            <label>S???? ta??i khoa??n</label>
                                            <Field type="text" name="bankAccountNumber" className='inputArea' />
                                            {errors.bankAccountNumber && touched.bankAccountNumber ? (<p className="text-validate">{errors.bankAccountNumber}
                                            </p>) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label>T??n ng??n ha??ng</label>
                                            <Field type="text" name="bankName" className='inputArea' />
                                            {errors.bankName && touched.bankName ? (<p className="text-validate">{errors.bankName}
                                            </p>) : null}
                                        </div>
                                        <div className="mb-3">
                                            <label>Gi????y ch????ng nh????n ti??m chu??ng vaccine</label><br />
                                            <input type="file" id="vaccine" onChange={vaccine} />
                                        </div>
                                        <div className="mb-3">
                                            <p className="title">Xa??c nh????n th??ng tin</p>
                                            <div className="rule-text">
                                                <p style={{ fontWeight: '500', fontSize: '20px' }}>??i???u kho???n d???ch v???</p>

                                                Ng?????i ????ng k?? ?????ng ?? r???ng Nha?? cung c????p c?? th??? s??? d???ng th??ng tin tr??n ????y ????? th???c hi???n d???ch v??? sau:

                                                <ol>
                                                    <li>M??? t??i kho???n giao ha??ng tr??n h???? th????ng.</li>
                                                </ol>
                                                L??u ??:

                                                <ol>
                                                    <li>Nha?? cung c????p s??? t??? ?????ng t???o t??n ????ng nh???p khi t???o t??i kho???n, b???n c?? th??? ch???nh s???a (n???u c???n).</li>
                                                    <li>Nha?? cung c????p se?? l????y th??ng tin cu??a ba??n ?????? ??i????u ph????i giao ha??ng.</li>
                                                </ol>
                                            </div>
                                            <div className='rules'>
                                                <input type="checkbox" className="rule-left" name='termsOfService' />
                                                <p className="rule-right">T??i ???? ?????c v?? ch???p nh???n c??c ??i???u kho???n d???ch v??? c???a Nha?? cung c????p.</p>
                                            </div>
                                        </div>
                                        <Button variant="primary" type="submit">
                                            ????ng ky?? giao ha??ng
                                        </Button>
                                    </div>
                                </Form>
                                {show ? <ModalPopup msg={msg} path={path} show={show} setShow={setShow} needRender={needRender} setNeedRender={setNeedRender} /> : null}
                            </>
                        )}
                    </Formik>
                </Container>
            </div>
            <Footer />
        </>
    )
}
