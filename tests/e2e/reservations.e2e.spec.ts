describe('Reservations', () => {
  let jwt: string;
  beforeAll(async () => {
    const user = {
      email: 'test-user@gmail.com',
      password: 'StrongPassword123!@',
    };
    await fetch('http://auth:3001/users', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    });
    const response = await fetch('http://auth:3001/auth/login', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'content-type': 'application/json',
      },
    });
    jwt = await response.text();
  });

  it('Create & GET', async () => {
    const responseCreate = await fetch(
      'http://reservations:3000/reservations',
      {
        method: 'POST',
        body: JSON.stringify({
          startDate: '03-26-2024',
          endDate: '03-30-2024',
          placeId: 'some_place_id',
          invoiceId: '1234',
          charge: {
            amount: 99,
            card: {
              cvc: 413,
              expMonth: 12,
              expYear: 2027,
              number: '4242 4242 4242 4242',
              holderName: 'Test Test',
            },
          },
        }),
        headers: {
          'content-type': 'application/json',
          authentication: jwt,
        },
      },
    );
    expect(responseCreate.ok).toBeTruthy();
    const createdReservation = await responseCreate.json();

    const responseGet = await fetch(
      `http://reservations:3000/reservations/${createdReservation._id}`,
      {
        headers: {
          'content-type': 'application/json',
          authentication: jwt,
        },
      },
    );
    const reservation = await responseGet.json();
    expect(createdReservation).toEqual(reservation);
  });
});
