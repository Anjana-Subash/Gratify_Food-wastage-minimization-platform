import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '../components/Loader'
import Meta from '../components/Meta'

import { GetngoDetails } from '../actions/ngoUserActions'
import { donate } from '../actions/userActions'

const RequestScreen = ({ history, match }) => {
    const [qty, setQty] = useState(0)

    const dispatch = useDispatch()

    const ngoDetails = useSelector((state) => state.ngoDetails)
    const { loading, error, ngo } = ngoDetails

    useEffect(() => {
        if (!ngo._id || ngo._id !== match.params.id) {
            dispatch(GetngoDetails(match.params.id))
        }
    }, [dispatch, match])

    const handlerDonate = () => {
        if (qty > 0) {
            const donation = {
                name: ngo.name,
                qty: qty,
                image: ngo.image,
                mobileNo: ngo.mobileNo,
                email: ngo.email,
                donatedTo: match.params.id,
            }
            dispatch(
                donate({
                    donations: donation,
                })
            )
            history.push(`/contact/${match.params.id}?qty=${qty}`)
        }
    }

    return (
        <>
            <Link className='btn btn-light my-3' to='/home'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={ngo.name} />
                    <Row>
                        <Col md={3}>
                            <Image src={ngo.image} alt={ngo.name} fluid />
                        </Col>
                        <Col md={6}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{ngo.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={ngo.rating}
                                        text={`${ngo.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Meals Required: {match.params.Qty}
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    Description: {ngo.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty (Person)</Col>
                                            <Col>
                                                <Form
                                                    value={qty}
                                                    onChange={(e) =>
                                                        setQty(e.target.value)
                                                    }
                                                    autocomplete='off'
                                                >
                                                    <input
                                                        type='number'
                                                        name='hidden'
                                                        value={qty}
                                                        required
                                                        min='1'
                                                        autocomplete='false'
                                                    />
                                                </Form>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            onClick={handlerDonate}
                                            className='btn-block'
                                            type='button'
                                        >
                                            Donate
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                </>
            )}
        </>
    )
}

export default RequestScreen
