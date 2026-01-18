import { useEffect } from 'react';
import { View, Text } from 'react-native';
import { useApi } from '../../hooks/useApi';
import { UserService } from '../../api/services/user.service';

const ProfileScreen = () => {
  const { data, loading, error, request } = useApi(UserService.getProfile);

  useEffect(() => {
    request();
  }, [request]);

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error loading profile</Text>;

  return (
    <View>
      <Text>Profile Screen</Text>
      {data && <Text>{data.name}</Text>}
    </View>
  );
};

export default ProfileScreen;
