import { signOut } from 'firebase/auth'
import { auth } from '../config/firebase'
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Spinner,
} from '@blueprintjs/core'
import { useEffect, useState } from 'react'
import config from '../config/config'
import { useAuthState } from 'react-firebase-hooks/auth'

const isValidEmail = (email: string) => {
  // General Email Regex (RFC 5322 Official Standard) // https://emailregex.com/
  const re =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  if (!re.test(email)) {
    return false
  }
  return true
}

const Profile = () => {
  const [user] = useAuthState(auth)

  const [loading, setLoading] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [error, setError] = useState('')

  useEffect(() => {
    const getProfile = async () => {
      setLoading(true)
      setError('')
      const accessToken = await user?.getIdToken()
      await fetch(`${config.apiUrl}/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: accessToken || '',
        },
      })
        .then((response) => response.json())
        .then((response) => {
          if (response.success) {
            setName(response.data.name || '')
            setEmail(response.data.email || '')
          } else {
            setError(response.error)
          }
          setLoading(false)
        })
        .catch((error) => {
          setError('Error happened while fetching the profile')
          setLoading(false)
        })
    }
    if (user) getProfile()
  }, [user])

  const save = async () => {
    setLoading(true)
    setError('')
    const accessToken = await user?.getIdToken()
    await fetch(`${config.apiUrl}/profile`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: accessToken || '',
      },
      body: JSON.stringify({
        name,
        email,
      }),
    })
      .then((response) => response.json())
      .then((response) => {
        if (response.success) {
          setName(response.data.name || '')
          setEmail(response.data.email || '')
        } else {
          setError(response.error)
        }
        setLoading(false)
      })
      .catch((error) => {
        setError('Error happened while saving the profile')
        setLoading(false)
      })
  }

  const logout = () => {
    signOut(auth)
  }

  return (
    <div className="center">
      <h1>Profile</h1>
      <Button
        onClick={logout}
        intent={Intent.DANGER}
        text="Log out"
        small={true}
        outlined={true}
      />
      <p className="redText">{error ? error : null}</p>
      <br />
      {loading ? (
        <Spinner intent="primary" />
      ) : (
        <>
          <FormGroup
            helperText={
              name.length > 0 && name.length <= 3 ? 'Name is too short' : null
            }
            label="Name"
            labelFor="name"
          >
            <InputGroup
              id="name"
              large={true}
              type="text"
              leftIcon="person"
              value={name}
              onChange={(event) => {
                setName(event.target.value)
              }}
              intent={
                name.length > 0 && name.length <= 3
                  ? Intent.DANGER
                  : Intent.NONE
              }
            />
          </FormGroup>

          <FormGroup
            helperText={
              email.length && !isValidEmail(email) ? 'Email is invalid' : null
            }
            label="Email"
            labelFor="email"
          >
            <InputGroup
              id="email"
              large={true}
              type="email"
              leftIcon="envelope"
              value={email}
              onChange={(event) => {
                setEmail(event.target.value)
              }}
              intent={
                email.length && !isValidEmail(email)
                  ? Intent.DANGER
                  : Intent.NONE
              }
            />
          </FormGroup>

          <Button
            intent="success"
            text="Save"
            onClick={() => save()}
            disabled={!isValidEmail(email) || name.length <= 3}
          />
        </>
      )}
    </div>
  )
}

export default Profile
