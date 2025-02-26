import { ICampaign } from '@/types/Campaign';
import { IDonate } from '@/types/Donation';
import { convertIDR } from '@/utils/currency';
import {
  Button,
  Card,
  CardBody,
  Checkbox,
  Divider,
  Input,
  Spinner,
  Textarea,
} from '@heroui/react';
import { Controller } from 'react-hook-form';
import { useEffect, useState } from 'react';
import useDetailCampaign from '../useDetailCampaign';

interface PropTypes {
  donation?: IDonate;
  dataCampaign: ICampaign;
  isLoading: boolean;
}

const DetailCampaignDonation = (props: PropTypes) => {
  const { dataCampaign, isLoading } = props;
  const {
    control,
    handleSubmitForm,
    errors,
    handleAddDonation,
    setValue,
    watch
  } = useDetailCampaign();

  const [donationAmount, setDonationAmount] = useState('');

  useEffect(() => {
    setValue("amount", donationAmount);
  }, [donationAmount, setValue]);

  const handleButtonClick = (amount: string) => {
    setDonationAmount(amount);
  };

  return (
    <Card radius='lg' className='border-none lg:top-[80px] w-full'>
      <CardBody className='gap-2 w-full'>
        <h2 className='text-xl font-semibold text-foreground-700'>
          Masukkan Nominal Donasi
        </h2>
        <div className='flex flex-wrap items-center gap-4'>
          <form onSubmit={handleSubmitForm(handleAddDonation)} className='w-full'>
            <div className='flex flex-wrap gap-4 w-full'>
              <Controller
                name="amount"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    isDisabled
                    label='Jumlah Donasi'
                    variant='bordered'
                    type='text'
                    value={donationAmount}
                    className='hidden'
                  />
                )}
              />
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    autoFocus
                    label='Nama'
                    variant='bordered'
                    type='text'
                    isInvalid={errors.name !== undefined}
                    errorMessage={errors.name?.message}
                  />
                )}
              />
              <Controller
                name="isShowName"
                control={control}
                render={({ field }) => (
                  <Checkbox
                    onChange={field.onChange}
                    defaultSelected
                    size="md"
                    isInvalid={errors.isShowName !== undefined}
                  >
                    <p className='text-medium font-semibold text-foreground-700'>
                      Sembunyikan nama saya
                    </p>
                  </Checkbox>
                )}
              />
              <Input
                isDisabled
                autoFocus
                label='Jumlah Donasi'
                variant='bordered'
                type='text'
                value={convertIDR(Number(donationAmount))}
                onChange={(e) => setDonationAmount(e.target.value)}
              />
              <div className='flex flex-wrap gap-2'>
                {[10000, 20000, 50000, 100000, 1000000].map(amount => (
                  <Button
                    key={amount}
                    type='button'
                    className='px-3 py-1 bg-teal-600 hover:opacity-80'
                    onPress={() => handleButtonClick(`${amount}`)}
                  >
                    <p className='text-white'> {convertIDR(amount)}</p>
                  </Button>
                ))}
              </div>
              <Controller
                control={control}
                name="message"
                render={({ field }) => (
                  <Textarea
                    {...field}
                    label='Sertakan doa dan dukungan (opsional)'
                    variant='bordered'
                    placeholder='Tulis doa untuk penggalang dana atau dirimu agar bisa diamini oleh Orang Baik lainnya.'
                    type='text'
                    isInvalid={errors.message !== undefined}
                    errorMessage={errors.message?.message}
                  />
                )}
              />
            </div>

            <Divider className='mt-5' />
            <Button type='submit' fullWidth size='md' className='bg-teal-600 my-5'>
              {isLoading ? (
                <Spinner size='sm' color='white' />
              ) : (
                <p className='text-white'>Donasi Sekarang</p>
              )}
            </Button>
          </form>
        </div>
      </CardBody>
    </Card>

  );
};

export default DetailCampaignDonation;
