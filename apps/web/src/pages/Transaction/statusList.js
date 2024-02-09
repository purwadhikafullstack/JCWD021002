export const statusList = [
    {
      label: 'Semua Transaksi',
      status: 'all_transaction',
      newStatus: '',
      paymentStatus: '',
    },
    {
      label: 'Belum Bayar',
      status: 'belum_bayar',
      newStatus: 'new_order',
      paymentStatus: 'pending',
    },
    {
      label: 'Siap Dikirim',
      status: 'on_process',
      newStatus: 'payment_accepted',
      paymentStatus: 'settlement',
    },
    {
      label: 'Dikirim',
      status: 'delivery',
      newStatus: 'delivery',
      paymentStatus: 'settlement',
    },
    {
      label: 'Selesai',
      status: 'done',
      newStatus: 'done',
      paymentStatus: 'settlement',
    },
    {
      label: 'Dibatalkan',
      status: 'cancel',
      newStatus: 'cancel',
      paymentStatus: 'pending',
    },
  ];
  