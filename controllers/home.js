const home = (req, res) => {
  const sehirler = [
    {
      plakaNo: '01',
      isim: 'adana',
    },
    {
      plakaNo: '02',
      isim: 'afyon',
    },
    {
      plakaNo: '70',
      isim: 'karaman',
    },
  ];

  

  res.status(200).json({
    cities: sehirler,
  });
};

module.exports = { home };
