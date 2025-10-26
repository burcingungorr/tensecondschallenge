import React from 'react';
import { Linking, Text } from 'react-native';

type ExternalLinkProps = {
  href: string;
  children: React.ReactNode;
};

export default function ExternalLink({ href, children }: ExternalLinkProps) {
  return (
    <Text
      style={{ color: '#0a7ea4', textDecorationLine: 'underline' }}
      onPress={() => Linking.openURL(href)}
    >
      {children}
    </Text>
  );
}
