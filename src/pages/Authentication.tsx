import { useEffect, useState } from 'react'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  ConfirmationResult,
} from 'firebase/auth'
import { auth } from '../config/firebase'
import { useAuthState } from 'react-firebase-hooks/auth'
import { Navigate } from 'react-router-dom'
import {
  Button,
  FormGroup,
  InputGroup,
  Intent,
  Spinner,
} from '@blueprintjs/core'
import { isValidPhoneNumber } from 'libphonenumber-js'

const verifyPhoneNumberInput = (
  event: React.KeyboardEvent<HTMLInputElement>,
) => {
  const re = /^[\d()+]+$/
  if (!re.test(event.key)) {
    event.preventDefault()
  }
}

const PhoneNumberInputForm = ({
  error,
  setError,
  phoneNumber,
  setPhoneNumber,
  sendVerificationCode,
}: {
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  phoneNumber: string
  setPhoneNumber: React.Dispatch<React.SetStateAction<string>>
  sendVerificationCode: () => void
}) => (
  <FormGroup
    helperText={error ? error : null}
    label="Phone number (incl. country code)"
    labelFor="phone-number"
  >
    <InputGroup
      id="phone-number"
      large={true}
      type="tel"
      leftIcon="phone"
      value={phoneNumber}
      onKeyPress={(event) => verifyPhoneNumberInput(event)}
      onChange={(event) => {
        setPhoneNumber(event.target.value)

        // Reset error
        if (error) {
          setError('')
        }
      }}
      intent={
        phoneNumber.length
          ? isValidPhoneNumber(phoneNumber)
            ? Intent.SUCCESS
            : Intent.DANGER
          : Intent.NONE
      }
      rightElement={
        <Button
          disabled={isValidPhoneNumber(phoneNumber) ? false : true}
          icon={'arrow-right'}
          intent={
            isValidPhoneNumber(phoneNumber) ? Intent.SUCCESS : Intent.DANGER
          }
          minimal={true}
          onClick={sendVerificationCode}
        />
      }
    />
  </FormGroup>
)

const VerificationCodeInputForm = ({
  goBack,
  error,
  setError,
  code,
  setCode,
  submitVerificationCode,
}: {
  goBack: () => void
  error: string
  setError: React.Dispatch<React.SetStateAction<string>>
  code: string
  setCode: React.Dispatch<React.SetStateAction<string>>
  submitVerificationCode: () => void
}) => (
  <>
    <p>
      <Button
        onClick={goBack}
        icon="arrow-left"
        intent={Intent.WARNING}
        text="Go back"
        small={true}
        outlined={true}
      />
    </p>
    <FormGroup
      helperText={error ? error : null}
      label="Verification code"
      labelFor="verification-code"
    >
      <InputGroup
        id="verification-code"
        type="number"
        large={true}
        leftIcon="key"
        value={code}
        onChange={(event) => {
          setCode(event.target.value)

          // Reset error
          if (error) {
            setError('')
          }
        }}
        intent={
          code.length !== 0
            ? code.length === 6
              ? Intent.SUCCESS
              : Intent.DANGER
            : Intent.NONE
        }
        rightElement={
          <Button
            disabled={code.length === 6 ? false : true}
            icon={'arrow-right'}
            intent={code.length === 6 ? Intent.SUCCESS : Intent.DANGER}
            minimal={true}
            onClick={submitVerificationCode}
          />
        }
      />
    </FormGroup>
  </>
)

const Authentication = () => {
  const [user] = useAuthState(auth)

  const [phoneNumber, setPhoneNumber] = useState('')
  const [confirmation, setConfirmation] = useState<ConfirmationResult>()
  const [code, setCode] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)
  const [appVerifier, setAppVerifier] = useState<RecaptchaVerifier>()

  useEffect(() => {
    setAppVerifier(
      new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible',
        },
        auth,
      ),
    )
  }, [])

  const sendVerificationCode = async () => {
    if (!isValidPhoneNumber(phoneNumber)) {
      return setError('Phone number is invalid')
    }

    if (!appVerifier) {
      return setError('Error occured')
    }

    setLoading(true)

    signInWithPhoneNumber(auth, phoneNumber, appVerifier)
      .then((result) => {
        setConfirmation(result)
        setLoading(false)
      })
      .catch((error) => {
        setError('Error occured')
        setLoading(false)
      })
  }

  const goBack = () => {
    setPhoneNumber('')
    setCode('')
    setError('')
    setConfirmation(undefined)
  }

  const submitVerificationCode = () => {
    if (code.length !== 6) {
      return setError('Verification code is invalid!')
    }

    setLoading(true)

    confirmation
      ?.confirm(code)
      .then(() => {
        setLoading(false)
      })
      .catch(() => {
        setError('Verification code is incorrect')
        setLoading(false)
      })
  }

  if (user) {
    return <Navigate to="/" />
  }

  return (
    <>
      <div className="center">
        <h1>Authentication</h1>
        {loading ? (
          <Spinner intent="primary" />
        ) : (
          <div>
            {!confirmation ? (
              <PhoneNumberInputForm
                error={error}
                setError={setError}
                phoneNumber={phoneNumber}
                setPhoneNumber={setPhoneNumber}
                sendVerificationCode={sendVerificationCode}
              />
            ) : null}
            {confirmation ? (
              <VerificationCodeInputForm
                goBack={goBack}
                error={error}
                setError={setError}
                code={code}
                setCode={setCode}
                submitVerificationCode={submitVerificationCode}
              />
            ) : null}
          </div>
        )}
      </div>
      <div id="recaptcha-container"></div>
    </>
  )
}

export default Authentication
