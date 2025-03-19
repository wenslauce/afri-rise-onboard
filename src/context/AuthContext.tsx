
import React, { createContext, useContext, useEffect, useState } from 'react';
import supabase from '@/lib/supabase';
import { Session, User } from '@supabase/supabase-js';
import { useNavigate } from 'react-router-dom';
import { toast } from '@/hooks/use-toast';

interface UserDetails {
  id: string;
  email: string;
  name: string;
  role: 'client' | 'reviewer' | 'admin';
  avatarUrl?: string;
}

interface AuthContextType {
  session: Session | null;
  user: User | null;
  userDetails: UserDetails | null;
  signUp: (email: string, password: string, name: string) => Promise<void>;
  signIn: (email: string, password: string) => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  updateUserDetails: (details: Partial<UserDetails>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const setData = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();
      if (error) {
        console.error('Error fetching session:', error);
        setLoading(false);
        return;
      }

      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        const { data, error } = await supabase
          .from('users')
          .select('id, email, name, role, avatar_url')
          .eq('id', session.user.id)
          .single();
        
        if (error) {
          console.error('Error fetching user details:', error);
        } else if (data) {
          setUserDetails({
            id: data.id,
            email: data.email,
            name: data.name,
            role: data.role as 'client' | 'reviewer' | 'admin',
            avatarUrl: data.avatar_url,
          });
        }
      }
      
      setLoading(false);
    };

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(true);
        setData();
      }
    );

    setData();

    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const signUp = async (email: string, password: string, name: string) => {
    try {
      setLoading(true);
      
      // Sign up the user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            name,
          },
        },
      });

      if (authError) throw authError;
      
      if (authData.user) {
        // Create user profile
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email,
          name,
          role: 'client', // Default role for new users
          password_hash: 'HASHED IN SUPABASE', // This is handled by Supabase Auth
        });

        if (profileError) throw profileError;

        toast({
          title: 'Account created',
          description: 'Please check your email for verification',
        });
        
        navigate('/login');
      }
    } catch (error: any) {
      console.error('Sign up error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign up failed',
        description: error.message || 'Could not create account',
      });
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (email: string, password: string) => {
    try {
      setLoading(true);
      
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) throw error;
      
      setSession(data.session);
      setUser(data.user);
      
      if (data.user) {
        const { data: userData, error: userError } = await supabase
          .from('users')
          .select('id, email, name, role, avatar_url')
          .eq('id', data.user.id)
          .single();
        
        if (userError) throw userError;
        
        setUserDetails({
          id: userData.id,
          email: userData.email,
          name: userData.name,
          role: userData.role as 'client' | 'reviewer' | 'admin',
          avatarUrl: userData.avatar_url,
        });
        
        // Redirect based on role
        if (userData.role === 'admin') {
          navigate('/admin');
        } else if (userData.role === 'reviewer') {
          navigate('/reviewer');
        } else {
          navigate('/dashboard');
        }
        
        toast({
          title: 'Welcome back',
          description: `Logged in as ${userData.name}`,
        });
      }
    } catch (error: any) {
      console.error('Sign in error:', error);
      toast({
        variant: 'destructive',
        title: 'Login failed',
        description: error.message || 'Invalid email or password',
      });
    } finally {
      setLoading(false);
    }
  };

  const signOut = async () => {
    try {
      setLoading(true);
      
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
      
      setSession(null);
      setUser(null);
      setUserDetails(null);
      
      navigate('/');
      
      toast({
        title: 'Signed out',
        description: 'You have been successfully logged out',
      });
    } catch (error: any) {
      console.error('Sign out error:', error);
      toast({
        variant: 'destructive',
        title: 'Sign out failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const updateUserDetails = async (details: Partial<UserDetails>) => {
    try {
      if (!user) throw new Error('User not authenticated');
      
      setLoading(true);
      
      const { error } = await supabase
        .from('users')
        .update(details)
        .eq('id', user.id);
      
      if (error) throw error;
      
      setUserDetails(prev => prev ? { ...prev, ...details } : null);
      
      toast({
        title: 'Profile updated',
        description: 'Your profile has been updated successfully',
      });
    } catch (error: any) {
      console.error('Update user details error:', error);
      toast({
        variant: 'destructive',
        title: 'Update failed',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        session,
        user,
        userDetails,
        signUp,
        signIn,
        signOut,
        loading,
        updateUserDetails,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
