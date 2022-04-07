import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addBankAccount, deleteBankAccount } from '../../store/portfolio/bankAccount';
import EditBank from './EditBank';
import AddBuyingPower from './AddBuyingPower';
import './Bank.css';
import { Modal2 } from './context/Modal';

const BankForm = () => {
  const [errors, setErrors] = useState([]);

  const [bank, setBank] = useState(1);

  const [name, setName] = useState('');
  const [accountNumber, setAccountNumber] = useState('');
  const [showModal, setShowModal] = useState(false)

  const [info, setInfo] = useState(false);

  const user = useSelector(state => state.session.user);
  const dispatch = useDispatch();

  let userId;
  if (user) {
    userId = user.id;
  }

  let banks = Object.values(useSelector(state => state.banks));
  let myAccounts = Object.values(useSelector(state => state.portfolio.bank_accounts));

  const handleSubmit = async e => {
    e.preventDefault();

    setErrors([]);

    const data = await dispatch(addBankAccount(userId, bank, accountNumber, name));
    if (data) {
      setErrors(data);
    } else if (!data) {

      setShowModal(false)
    }



    setInfo(true);
  };

  const handleClick = async e => {
    e.preventDefault();

    let id = e.target.id;

    const data = await dispatch(deleteBankAccount(id));

    if (data) {
      alert(data);
    }

    setInfo(true);
  };

  const updateBank = e => {
    setBank(e.target.value);
  };

  const updateName = e => {
    setName(e.target.value);
  };

  const updateAccountNumber = e => {
    setAccountNumber(e.target.value);
  };

  return (
    <>


      {/* <button className='bank-button' onClick={() => setShowModal(true)}>Add BP</button>

{showModal && (

  <Modal2
    title={`Transfer funds from ${name}`}
    onClose={() => setShowModal(false)}
    show={showModal}
  > */}

      <button className='link-bank-button' onClick={() => setShowModal(true)}>Link Bank Account</button>

      <Modal2

        title={`Add a Bank`}
        onClose={() => {
          setShowModal(false)
          setErrors([])
          setAccountNumber('')
          setName('')
        }}

        show={showModal}>

        <div className='form-outer-container'>
          <div className='form-inner-container'>
            <form className='bank-form' onSubmit={handleSubmit}>
              <div className='bank-errors'>
                {errors.map((error, ind) => (
                  <div key={ind}>{error.split(':')[1]}</div>
                ))}
              </div>

              <div>
                <input type='hidden' id='userId' name='userId' value={userId} />
              </div>

              <div className='sub-container'>
                <div>
                  <label htmlFor='bank_id'>Select a bank </label>
                  <select
                    className='select-bank'
                    name='bank_id'
                    type='text'
                    value={bank}
                    onChange={updateBank}
                    required={true}
                  >
                    {banks?.map(bank => (
                      <option key={bank.id} value={bank.id}> {bank.name} </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor='accountNumber'>Account Number </label>
                  <input
                    name='accountNumber'
                    type='text'
                    placeholder='Account Number'
                    required={true}
                    value={accountNumber}
                    onChange={updateAccountNumber}
                  />
                </div>

                <div>
                  <label htmlFor='name'>Name </label>
                  <input
                    name='name'
                    type='text'
                    placeholder='Name'
                    value={name}
                    onChange={updateName}
                  />
                </div>

                <button className='add-bank-button' type='submit'>
                  Add Bank
                </button>
              </div>
            </form>
          </div>
        </div>


      </Modal2>

      <div className='table-outer-container add-buying-power-container'>
        <div className='table-inner-container'>
          {myAccounts?.length > 0 && <h3> My Linked Accounts: </h3>}

          {myAccounts?.length < 1 && <h3> Please link a bank account. </h3>}



          <table className='linked-accounts-table'>
            {myAccounts?.length > 0 && (
              <tbody>
                <tr>
                  <td>Name </td>
                  <td>Bank </td>
                  <td>Account Number </td>
                </tr>
                {/* <th>Edit </th>
              <th>Delete </th> */}
                {/* <th>Bank ID </th> */}
              </tbody>
            )}
            <tbody>
              {myAccounts?.map(bank => (

                <tr key={bank.id}>
                  <td>{bank.name}</td>
                  <td>{bank.bank_name}</td>
                  <td>{bank.account_number}</td>
                  <td>
                    <AddBuyingPower
                      className='bank-button'
                      userId={userId}
                      name={bank.name}
                      accountNumber={bank.account_number}
                      id={bank.id}
                      bankId={bank.bank_id}
                    />

                    <EditBank
                      className='bank-button'
                      userId={userId}
                      name={bank.name}
                      accountNumber={bank.account_number}
                      id={bank.id}
                      bankId={bank.bank_id}
                    />

                    <button className='bank-button' id={bank.id} onClick={handleClick}>
                      Delete
                    </button>
                  </td>
                  {/* <td>{bank.id}</td> */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* <div className='form-outer-container'>
        <div className='form-inner-container'>
          <form className='bank-form' onSubmit={handleSubmit}>
            <div className='bank-errors'>
              {errors.map((error, ind) => (
                <div key={ind}>{error.split(':')[1]}</div>
              ))}
            </div>

            <div>
              <input type='hidden' id='userId' name='userId' value={userId} />
            </div>

            <div className='sub-container'>
              <div>
                <label htmlFor='bank_id'>Select a bank </label>
                <select
                  className='select-bank'
                  name='bank_id'
                  type='text'
                  value={bank}
                  onChange={updateBank}
                  required={true}
                >
                  {banks?.map(bank => (
                    <option key={bank.id} value={bank.id}> {bank.name} </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor='accountNumber'>Account Number </label>
                <input
                  name='accountNumber'
                  type='text'
                  placeholder='Account Number'
                  required={true}
                  value={accountNumber}
                  onChange={updateAccountNumber}
                />
              </div>

              <div>
                <label htmlFor='name'>Name </label>
                <input
                  name='name'
                  type='text'
                  placeholder='Name'
                  value={name}
                  onChange={updateName}
                />
              </div>

              <button className='add-bank-button' type='submit'>
                Add Bank
              </button>
            </div>
          </form>
        </div>
      </div> */}
    </>
  );
};

export default BankForm;
